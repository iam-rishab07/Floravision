package com.floravision.backend.services;

import com.floravision.backend.entities.Order;
import com.floravision.backend.entities.OrderItem;
import com.floravision.backend.entities.Plant;
import com.floravision.backend.entities.User;
import com.floravision.backend.repositories.OrderRepository;
import com.floravision.backend.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PlantRepository plantRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, PlantRepository plantRepository) {
        this.orderRepository = orderRepository;
        this.plantRepository = plantRepository;
    }

    @Transactional
    public Order placeOrder(Order orderRequest) {
        if (orderRequest.getOrderItems() == null || orderRequest.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Cannot place an order with an empty basket.");
        }

        BigDecimal computedSubtotal = BigDecimal.ZERO;

        for (OrderItem item : orderRequest.getOrderItems()) {
            if (item.getPlant() == null || item.getPlant().getId() == null) {
                throw new IllegalArgumentException("Order items must reference a valid plant ID.");
            }

            // 1. Fetch plant details directly from DB to prevent client-side price
            // tampering
            Plant plant = plantRepository.findById(item.getPlant().getId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Plant not found with ID: " + item.getPlant().getId()));

            // 2. Validate inventory stock levels
            if (plant.getStockQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Insufficient inventory stock for plant: " + plant.getName() +
                        " (Available: " + plant.getStockQuantity() + ")");
            }

            // 3. Deduct stock quantity
            plant.setStockQuantity(plant.getStockQuantity() - item.getQuantity());
            plantRepository.save(plant);

            // 4. Freeze catalog price in order details
            item.setPlant(plant);
            item.setUnitPrice(plant.getPrice());
            item.setOrder(orderRequest);

            // 5. Accumulate subtotal (item price * item quantity)
            BigDecimal itemTotal = plant.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            computedSubtotal = computedSubtotal.add(itemTotal);
        }

        // 6. Recalculate Shipping, Tax, and Totals securely on the server
        orderRequest.setSubtotal(computedSubtotal);

        // Shipping rules: Free if subtotal > 500, otherwise 50
        BigDecimal shippingFee = (computedSubtotal.compareTo(BigDecimal.valueOf(500)) > 0
                || computedSubtotal.compareTo(BigDecimal.ZERO) == 0)
                        ? BigDecimal.ZERO
                        : BigDecimal.valueOf(50);
        orderRequest.setShippingFee(shippingFee);

        // Tax rules: 5% tax
        BigDecimal tax = computedSubtotal.multiply(BigDecimal.valueOf(0.05)).setScale(2, RoundingMode.HALF_UP);
        orderRequest.setTax(tax);

        // Grand total
        BigDecimal grandTotal = computedSubtotal.add(shippingFee).add(tax);
        orderRequest.setTotalAmount(grandTotal);

        // 7. Initialize status values
        orderRequest.setOrderStatus(Order.OrderStatus.Pending);
        orderRequest.setPaymentStatus(Order.PaymentStatus.Pending);

        return orderRepository.save(orderRequest);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + id));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
