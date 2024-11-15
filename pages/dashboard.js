import '../styles/styles.css'; // Adjust the path if necessary
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

export default function Dashboard() {
  const [formData, setFormData] = useState({
    dealNumber: '',
    fundName: '',
    investorName: '',
    tradeType: '',
    tradeDate: '',
    settlementDate: '',
    amount: '',
    currency: 'EUR',
    shareAmount: '',
    apexReference: '',
    tradeReceived: '',
  });

  const [tableData, setTableData] = useState([]);

  const generateDealNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000) + 1;
    return `SPH${randomNum.toString().padStart(5, '0')}`;
  };

  const generateApexReference = () => {
    const randomNum = Math.floor(Math.random() * 1000000) + 1;
    return `APX${randomNum}`;
  };

  const formatAmount = (value) => {
    // Remove non-numeric characters and format the number
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'amount') {
      // Format amount with commas
      formattedValue = formatAmount(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDealNumber = generateDealNumber();
    const newApexReference = generateApexReference();

    setTableData([
      ...tableData,
      { ...formData, dealNumber: newDealNumber, apexReference: newApexReference },
    ]);
    setFormData({
      dealNumber: '',
      fundName: '',
      investorName: '',
      tradeType: '',
      tradeDate: '',
      settlementDate: '',
      amount: '',
      currency: 'EUR',
      shareAmount: '',
      apexReference: '',
      tradeReceived: '',
    });
  };

  const handleRemoveRow = (index) => {
    const newTableData = tableData.filter((_, i) => i !== index);
    setTableData(newTableData);
  };

  return (
    <div className="container">
      <h1>Sephira V1 - Trade Capture Tool</h1>
      <h2>by Philip Giles</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dealNumber">Deal Number</label>
            <input
              type="text"
              id="dealNumber"
              name="dealNumber"
              value={formData.dealNumber}
              onChange={handleChange}
              placeholder="Auto-generated"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="fundName">Fund Name</label>
            <input
              type="text"
              id="fundName"
              name="fundName"
              value={formData.fundName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="investorName">Investor Name</label>
            <input
              type="text"
              id="investorName"
              name="investorName"
              value={formData.investorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tradeType">Trade Type</label>
            <select
              id="tradeType"
              name="tradeType"
              value={formData.tradeType}
              onChange={handleChange}
              required
            >
              <option value="">Select Trade Type</option>
              <option value="Initial Subscription">Initial Subscription</option>
              <option value="Subscription">Subscription</option>
              <option value="Redemption">Redemption</option>
              <option value="Full Redemption">Full Redemption</option>
              <option value="Transfer">Transfer</option>
              <option value="Full Transfer">Full Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tradeDate">Trade Date</label>
            <input
              type="date"
              id="tradeDate"
              name="tradeDate"
              value={formData.tradeDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="settlementDate">Settlement Date</label>
            <input
              type="date"
              id="settlementDate"
              name="settlementDate"
              value={formData.settlementDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shareAmount">Share Amount</label>
            <input
              type="number"
              id="shareAmount"
              name="shareAmount"
              value={formData.shareAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apexReference">Apex Reference</label>
            <input
              type="text"
              id="apexReference"
              name="apexReference"
              value={formData.apexReference}
              onChange={handleChange}
              placeholder="Auto-generated"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="tradeReceived">Trade Received</label>
            <input
              type="date"
              id="tradeReceived"
              name="tradeReceived"
              value={formData.tradeReceived}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Save Entry</button>
          </div>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Deal Number</th>
              <th>Fund Name</th>
              <th>Investor Name</th>
              <th>Trade Type</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Share Amount</th>
              <th>Apex Reference</th>
              <th>Trade Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.dealNumber}</td>
                <td>{data.fundName}</td>
                <td>{data.investorName}</td>
                <td>{data.tradeType}</td>
                <td>{data.tradeDate}</td>
                <td>{data.settlementDate}</td>
                <td>{data.amount}</td>
                <td>{data.currency}</td>
                <td>{data.shareAmount}</td>
                <td>{data.apexReference}</td>
                <td>{data.tradeReceived}</td>
                <td>
                  <button className="remove-row" onClick={() => handleRemoveRow(index)}>
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CSVLink data={tableData} className="csv-button" target="_blank">
          Export to CSV
        </CSVLink>
      </div>
    </div>
  );
}