import pandas as pd 
import yfinance as yf 
import matplotlib.pyplot as plt
import numpy as np
import streamlit as st 

st.title("Invest Portfolio Dashboard")

assets = st.text_input("Provide your assets (comma-separated)", "AAPL, MSFT, GOOGL")
start = st.date_input("Pick a starting date for your analysis", value=pd.to_datetime('2022-06-01'))

data = yf.download(assets, start=start)['Adj Close']

st.subheader("Downloaded Data")
st.dataframe(data)

ret_df = data.pct_change()

cumul_ret = (ret_df + 1).cumprod() - 1

pf_cumul_ret = cumul_ret.mean(axis=1)

st.subheader("Cumulative Returns")
st.dataframe(cumul_ret)

st.subheader("Portfolio Cumulative Returns")
st.line_chart(pf_cumul_ret)

benchmark = yf.download('^GSPC', start=start)['Adj Close']

bench_ret = benchmark.pct_change()

bench_dev = (bench_ret + 1).cumprod() - 1

st.subheader("Benchmark Cumulative Returns")
st.line_chart(bench_dev)

W = (np.ones(len(ret_df.cov())) / len(ret_df.cov()))

pf_std = (W.dot(ret_df.cov()).dot(W)) ** (1 / 2)

st.subheader("Portfolio Standard Deviation")
st.write(pf_std)

st.subheader("Benchmark Risk")
bench_risk = bench_ret.std()
st.write(bench_risk)

st.subheader("Portfolio Composition")
fig, ax = plt.subplots(facecolor='#121212')
ax.pie(W, labels=data.columns, autopct='%1.1f%%', textprops={'color':'white'})
st.pyplot(fig)
