import pandas as pd 
import yfinance as yf 
import matplotlib.pyplot as plt
import numpy as np
import streamlit as st 

# Set title and get user inputs
st.title("Invest Portfolio Dashboard")

# Example NSE ticker symbols (replace with your own)
assets = st.text_input("Provide your assets (comma-separated)", "INFY.NS, TCS.NS, HINDUNILVR.NS")
start = st.date_input("Pick a starting date for your analysis", value=pd.to_datetime('2022-06-01'))

# Download adjusted close prices data for NSE stocks
data = yf.download(assets, start=start)['Adj Close']

# Display raw data
st.subheader("Raw Data")
st.write(data)

# Calculate daily returns and cumulative returns
ret_df = data.pct_change()
cumul_ret = (ret_df + 1).cumprod() - 1

# Calculate portfolio cumulative returns
pf_cumul_ret = cumul_ret.mean(axis=1)

# Display cumulative returns
st.subheader("Cumulative Returns")
st.write(cumul_ret)

# Display portfolio cumulative returns
st.subheader("Portfolio Cumulative Returns")
st.write(pf_cumul_ret)

# Download S&P 500 index data for benchmarking (example)
benchmark = yf.download('^GSPC', start=start)['Adj Close']

# Calculate benchmark daily returns and cumulative returns
bench_ret = benchmark.pct_change()
bench_dev = (bench_ret + 1).cumprod() - 1

# Display benchmark cumulative returns
st.subheader("Benchmark Cumulative Returns (S&P 500)")
st.write(bench_dev)

# Calculate portfolio standard deviation
W = np.ones(len(ret_df.columns)) / len(ret_df.columns)  # Adjust for NSE stocks
pf_std = np.sqrt(W.dot(ret_df.cov()).dot(W))

# Display portfolio standard deviation
st.subheader("Portfolio Standard Deviation")
st.write(pf_std)

# Display covariance matrix of returns
st.subheader("Covariance Matrix of Returns")
st.write(ret_df.cov())

# Create a DataFrame for comparison
comparison_df = pd.concat([bench_dev, pf_cumul_ret], axis=1)
comparison_df.columns = ['S&P500 Performance', 'Portfolio Performance']

# Display comparison DataFrame
st.subheader("Portfolio vs. Index Development")
st.write(comparison_df)

# Plot line chart of portfolio vs. index performance
st.subheader("Portfolio vs. Index Performance")
st.line_chart(data=comparison_df)


