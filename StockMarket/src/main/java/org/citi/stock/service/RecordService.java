package org.citi.stock.service;

import org.citi.stock.bean.*;
import org.citi.stock.db.DBConnection;
import java.util.*;
import java.sql.*;
import java.util.Date;
import java.text.SimpleDateFormat;



public class RecordService {

	ArrayList<DisplayRecord> ud=new ArrayList<DisplayRecord>();
	public RecordService() {
		super();
	}

	public int saveData(Record data) throws Exception //save the userselected data in db
	{
		Date now = new Date();
		String pattern = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat formatter = new SimpleDateFormat(pattern);
		String ts = formatter.format(now); 
		//System.out.println(data.getUsername()+"\n"+data.getSymbol()+"\n"+data.getCompanyName()+"\n"+data.getSector()+"\n"+data.getMarketCap()+"\n"+data.getLatestPrice()+"\n"+data.getHigh()+"\n"+data.getLow()+"\n"+data.getYtdChange()+"\n"+ts);

		Connection con=DBConnection.getConnectionfunc();
		String query="insert into userdata(username,symbol,companyName,sector,marketCap,latestPrice,high,low,ytdChange,ts) values(?,?,?,?,?,?,?,?,?,?)";

		PreparedStatement setData=con.prepareStatement(query);
		setData.setString(1, data.getUsername());
		setData.setString(2, data.getSymbol());
		setData.setString(3, data.getCompanyName());
		setData.setString(4, data.getSector());
		setData.setLong(5, data.getMarketCap());
		setData.setFloat(6, data.getLatestPrice());
		setData.setFloat(7, data.getHigh());
		setData.setFloat(8, data.getLow());
		setData.setDouble(9, data.getYtdChange());
		setData.setString(10, ts);
		if(setData.execute())
		{
			System.out.println("inserted");
			return 1;//can use to give msg of record saved
		}
		return 0;
	}

	public ArrayList<DisplayRecord> getSavedData(String id) throws Exception //when user want to see his saved data
	{
		String s = "",c="",sec="";
		String ts;
		long mc=0;
		float lp=0,h=0,l=0;
		double cp=0,ytdc=0;

		//System.out.println(" save User data");

		Connection con=DBConnection.getConnectionfunc();
		String query="select* from userdata where username='"+id+"'";
		Statement getUser=con.createStatement();		
		ResultSet rs=getUser.executeQuery(query);
		int cnt=0;
		while(rs.next())
		{
			DisplayRecord rc=new DisplayRecord();

			s=rs.getString("symbol");
			rc.setSymbol(s);
			c=rs.getString("companyName");
			rc.setCompanyName(c);
			sec=rs.getString("sector");
			rc.setSector(sec);
			mc=rs.getLong("marketCap");
			rc.setMarketCap(mc);
			lp=rs.getFloat("latestPrice");
			rc.setLatestPrice(lp);
			h=rs.getFloat("high");
			rc.setHigh(h);
			l=rs.getFloat("low");
			rc.setLow(l);
			ytdc=rs.getDouble("ytdChange");
			rc.setYtdChange(ytdc);
			ts=rs.getString("ts");
			rc.setTs(ts);
			ud.add(rc);
			//System.out.println(s+"\n"+c+"\n"+per+"\n"+mc+"\n"+lp+"\n"+h+"\n"+l+"\n"+cp+"\n"+ytdc+"\n"+ts);
		}

		/*System.out.println(" ");
		for(int i=0;i<ud.size();i++)
		{
			System.out.println(ud.get(i).getSymbol()+"  "+ud.get(i).getCompanyName()+"  "+ud.get(i).getSector()+"  "+ud.get(i).getMarketCap()+"  "+ud.get(i).getLatestPrice()+"  "+ud.get(i).getHigh()+"  "+ud.get(i).getLow()+"  "+ud.get(i).getYtdChange()+"  "+ud.get(i).getTs());		 
		}*/

		return ud;

	}

	public int delSavedData(String id,DisplayRecord data) throws Exception //when user want to see his saved data
	{

		/*System.out.println(" save User data  ="+data.getTs()+data.getSymbol()+id);
		System.out.println("2");
		System.out.println("2");
		System.out.println("*******************************************************************************************************");

		System.out.println("3");*/
		//--------------------------------
		Connection con=DBConnection.getConnectionfunc();
		String query="delete from userdata where username=? and symbol=? and ts=?";
		PreparedStatement deld=con.prepareStatement(query);
		deld.setString(1, id);
		deld.setString(2, data.getSymbol());
		deld.setString(3, data.getTs());
		int a=deld.executeUpdate();
		if(a==1)
		{
			return 1;
		}
		return 0;		
	}

}