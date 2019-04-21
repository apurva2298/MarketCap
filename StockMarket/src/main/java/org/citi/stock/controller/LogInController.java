package org.citi.stock.controller;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.*;

import org.citi.stock.bean.LogIn;
import org.citi.stock.service.LogInService;

@Path("/login")
public class LogInController {
LogInService loginservice=new LogInService();
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	public int checkValidUser(LogIn user) throws Exception
	{
		return loginservice.checkValidUser(user);
	}

}

