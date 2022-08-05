package com.example.finalproj.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long trackingCode;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "email")
    private User user;
    @Basic(optional = false)
    private int quantity;
    @Basic(optional = false)
    private String address;
    @Basic(optional = false)
    private int price;
    @CreatedDate
    private Date date;
    @Enumerated(EnumType.STRING)
    private ReceiptStatus status;
}
