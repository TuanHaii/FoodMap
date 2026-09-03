import React from 'react';
import type { BusinessInvoice } from '../../../domain/subscription/types';
import { Badge } from '../common/Badge/Badge';
import './BusinessDataTable.css';

export interface BusinessDataTableProps {
  invoices: BusinessInvoice[];
}

export const BusinessDataTable: React.FC<BusinessDataTableProps> = ({ invoices }) => {
  return (
    <div className="responsive-table-wrapper">
      {/* Desktop Standard HTML Table */}
      <table className="desktop-table">
        <thead>
          <tr>
            <th>Mã hóa đơn</th>
            <th>Ngày thanh toán</th>
            <th>Gói dịch vụ</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="inv-code">{inv.id}</td>
              <td>{inv.date}</td>
              <td>{inv.plan_name}</td>
              <td className="inv-amount">{inv.amount.toLocaleString('vi-VN')}đ</td>
              <td>
                <Badge variant={inv.status === 'PAID' ? 'success' : 'warning'}>
                  {inv.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xử lý'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card Layout (Requirement #18) */}
      <div className="mobile-cards-list">
        {invoices.map((inv) => (
          <div key={inv.id} className="mobile-invoice-card">
            <div className="mobile-card-row">
              <span className="mobile-label">Mã hóa đơn:</span>
              <span className="mobile-value inv-code">{inv.id}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Ngày:</span>
              <span className="mobile-value">{inv.date}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Gói:</span>
              <span className="mobile-value">{inv.plan_name}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Số tiền:</span>
              <span className="mobile-value inv-amount">{inv.amount.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-label">Trạng thái:</span>
              <Badge variant={inv.status === 'PAID' ? 'success' : 'warning'}>
                {inv.status === 'PAID' ? 'Đã thanh toán' : 'Chờ xử lý'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
