package org.citi.stock.bean;

public class LogIn {
	static String username;
	String password;
	
	public LogIn() {
		super();
	}

	public LogIn(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public static String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
