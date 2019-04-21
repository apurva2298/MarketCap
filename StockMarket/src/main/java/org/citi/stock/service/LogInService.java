package org.citi.stock.service;

import org.citi.stock.bean.LogIn;
import org.citi.stock.db.DBConnection;

import java.sql.*;

public class LogInService {
	//ArrayList<LogIn> checkUser=new ArrayList<LogIn>();
	
	public LogInService() {
		super();
		
	}
	
	public int checkValidUser(LogIn user) throws Exception
	{
		/*System.out.println("Inside checkValidUser");
		System.out.println("Username= "+ user.getUsername());
		System.out.println("PAssword = "+user.getPassword());*/

		Connection con=DBConnection.getConnectionfunc();
		Statement stmt=con.createStatement();
		
		String query="select password from login where username=? AND password=?";
				
		 PreparedStatement getPass=con.prepareStatement(query);
		 getPass.setString(1, user.getUsername());
		 getPass.setString(2, user.getPassword());
		 ResultSet rs=getPass.executeQuery();
		 //rs.next();
		 if(rs.isBeforeFirst())
		 {
			 rs.next();
			// System.out.println("Not empty");
			 return 1;
		 }
		 else {
			// System.out.println(" empty");
			 return 0;
		 }
		
		/*String query="insert into login(username,password) values('dd','d')";
		PreparedStatement getPass=con.prepareStatement(query);
		getPass.execute();
		*/
			
	}
}
