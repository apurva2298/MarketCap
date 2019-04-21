package org.citi.stock.controller;

	import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
	import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
	import javax.ws.rs.core.MediaType;
	import java.sql.*;
import java.util.ArrayList;

import org.citi.stock.bean.DisplayRecord;
import org.citi.stock.bean.Record;
	import org.citi.stock.service.RecordService;

	@Path("/save")
	public class RecordController {
		RecordService recordservice=new RecordService();
		
		//refer login.html for sending post request
		@POST
	    @Produces(MediaType.APPLICATION_JSON)
		public int saveData(Record data) throws Exception
		{
			//System.out.println("Inside Controller");
			return recordservice.saveData(data);
		}
		
		@GET
		@Path("/myData/{id}")
	    @Produces(MediaType.APPLICATION_JSON)
		public ArrayList<DisplayRecord> getSavedData(@PathParam("id") String id) throws Exception
		{
			//System.out.println("ID ="+id);
			return recordservice.getSavedData(id);
		}
		
		@DELETE
		@Path("/delete/{id}")
	    @Produces(MediaType.APPLICATION_JSON)
		public int delSavedData(@PathParam("id") String id,DisplayRecord data) throws Exception
		{
			//System.out.println("ID in delete function="+id);
			return recordservice.delSavedData(id,data);
		}

}

