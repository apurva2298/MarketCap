package org.citi.stock.bean;

public class DisplayRecord {
	
		String symbol,companyName;		
		String sector;
		Long marketCap;
		Float latestPrice,high,low;
		Double ytdChange;
		String ts;
		public DisplayRecord() {
			super();
			// TODO Auto-generated constructor stub
		}
		public DisplayRecord(String symbol, String companyName, String sector, Long marketCap, Float latestPrice, Float high,
				Float low, Double ytdChange,String ts) {
			super();
			//this.username=username;
			this.symbol = symbol;
			this.companyName = companyName;
			this.sector = sector;
			this.marketCap = marketCap;
			this.latestPrice = latestPrice;
			this.high = high;
			this.low = low;
			this.ytdChange = ytdChange;
			this.ts=ts;
		}
		public String getTs() {
			return ts;
		}
		public void setTs(String ts2) {
			this.ts = ts2;
		}
		public String getSymbol() {
			return symbol;
		}
		public void setSymbol(String symbol) {
			this.symbol = symbol;
		}
		public String getCompanyName() {
			return companyName;
		}
		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}
		public String getSector() {
			return sector;
		}
		public void setSector(String sector) {
			this.sector = sector;
		}
		public Long getMarketCap() {
			return marketCap;
		}
		public void setMarketCap(Long marketCap) {
			this.marketCap = marketCap;
		}
		public Float getLatestPrice() {
			return latestPrice;
		}
		public void setLatestPrice(Float latestPrice) {
			this.latestPrice = latestPrice;
		}
		public Float getHigh() {
			return high;
		}
		public void setHigh(Float high) {
			this.high = high;
		}
		public Float getLow() {
			return low;
		}
		public void setLow(Float low) {
			this.low = low;
		}
		public Double getYtdChange() {
			return ytdChange;
		}
		public void setYtdChange(Double ytdChange) {
			this.ytdChange = ytdChange;
		}
}
