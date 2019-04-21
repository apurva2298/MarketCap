package org.citi.stock.db;

import java.sql.*;
public class DBConnection
{
	static Connection con=null;
	
	Statement stmt=null;
	 String query;
	static String USER="root";
	static String PASS="mypass";
	static String JDBC_DRIVER="com.mysql.jdbc.Driver";
	static String DB_url="jdbc:mysql://localhost:3306/citi?useSSL=false";
	
	public static Connection getConnectionfunc() {
		try {
			Class.forName(JDBC_DRIVER);
			con=DriverManager.getConnection(DB_url,USER,PASS);
		}
		catch(SQLException e){
			e.printStackTrace();
		}
		catch(ClassNotFoundException c) {
			c.printStackTrace();
		}
		return con;
	}
	public static void closeConnection() {
		try {
			con.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
	}
}
