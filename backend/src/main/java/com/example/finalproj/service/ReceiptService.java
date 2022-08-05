package com.example.finalproj.service;

import com.example.finalproj.dto.requestDto.ReceiptRequestDto;
import com.example.finalproj.dto.responseDto.ReceiptResponseDto;
import com.example.finalproj.entity.Receipt;
import com.example.finalproj.exception.DatabaseException;
import com.example.finalproj.exception.NotFoundObjectException;
import com.example.finalproj.exception.NullValueException;
import com.example.finalproj.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    /////GET::Services
    public List<ReceiptResponseDto> findAllReceipts() {
        try {
            List<ReceiptResponseDto> rrdList = new ArrayList<>();
            receiptRepository.findAll().forEach(c -> {
                rrdList.add(new ReceiptResponseDto(c.getTrackingCode(),
                        c.getProduct().getName(),
                        c.getUser().getUsername(),
                        c.getQuantity(),
                        c.getAddress(),
                        c.getPrice(),
                        c.getStatus().toString(),
                        c.getDate()));
            });
            return rrdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public ReceiptResponseDto findById(Long trackingCode) {
        Receipt receipt = getById(trackingCode);
        return new ReceiptResponseDto(receipt.getTrackingCode(),
                receipt.getProduct().getName(),
                receipt.getUser().getUsername(),
                receipt.getQuantity(),
                receipt.getAddress(),
                receipt.getPrice(),
                receipt.getStatus().toString(),
                receipt.getDate());
    }

    public Receipt getById(Long trackingCode) {
        Receipt receipt = receiptRepository.findById(trackingCode).orElse(null);
        if (receipt == null)
            throw new NotFoundObjectException();
        return receipt;
    }

    /////PUT::Services
    public void updateReceipt(ReceiptRequestDto rrd) {
        Receipt existingReceipt = getById(rrd.getTrackingId());
        if (rrd.getStatus() == null)
            throw new NullValueException();
        existingReceipt.setStatus(rrd.getStatus());
        receiptRepository.save(existingReceipt);
    }
}
