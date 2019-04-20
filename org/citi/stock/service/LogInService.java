package org.citi.stock.service;

import org.citi.stock.bean.LogIn;
//import org.citi.stock.db.DBConnection;

import java.sql.*;

public class LogInService {
		
	public LogInService() {
		super();
		
	}
	
	public int checkValidUser(LogIn user) throws Exception
	{
				Connection con=DBConnection.getConnectionfunc();
		Statement stmt=con.createStatement();
		
		String query="select password from login where username=? AND password=?";
				
		 PreparedStatement getPass=con.prepareStatement(query);
		 getPass.setString(1, user.getUsername());
		 getPass.setString(2, user.getPassword());
		 ResultSet rs=getPass.executeQuery();
	
		 if(rs.isBeforeFirst())
		 {
			 rs.next();
						 return 1;
		 }
		 else {
						 return 0;
		 }
		
					
	}
}
