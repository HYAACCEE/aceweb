package com.svv.dms.web.biz;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

import com.svv.dms.web.util.DES;

public class TestWebServer {
    final static int BUFFER_SIZE = 4096;
	final static String SERVER = "http://121.40.78.25:8098/padm/";
	final static DES des = new DES();

	public static void main(String[] args){
		String LOGINTIME = new Date().getTime()+"";
		//web调用
		//TestWebServer.url("YSService.y?cmd=version", "{code:'201'}");
		//TestWebServer.url("YSService.y?cmd=registCheckPhone", "{a2:'12201110101'}");
		//TestWebServer.url("YSService.y?cmd=login", "{a1:'"+des.md5("123456")+"',a2:'13301110101'}");
		//TestWebServer.url("YSService.y?cmd=applyUrl", "{a1:'"+des.md5("123456")+"',a2:'13301110101'}");
		TestWebServer.url("CandiService.y?cmd=piclist", "{a0:'160212132545157010159714662569',picGroup:'1',M0:'WW',M1:'',M2:'"+LOGINTIME+"',M3:'',M9:'"+(new Date()).getTime()+"'}");

		
		
	}
	
	
    public static String url(String url, String param){
		String rtn = "";
		try {
			url = SERVER.concat(url);
			URL sendUrl = new URL(url);
			URLConnection connection = sendUrl.openConnection();
			connection.setConnectTimeout(30000);
			connection.setReadTimeout(30000);
			connection.setDoOutput(true);
			connection.setRequestProperty("content-type", "text/html");
			OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "utf-8");
			out.write(des.encrypt(param));
			out.flush();
			out.close();
			
			InputStreamReader in = new InputStreamReader(connection.getInputStream(), "utf-8");
			String sCurrentLine = "";
			BufferedReader l_reader = new BufferedReader(in);
			while ((sCurrentLine = l_reader.readLine()) != null) {
				rtn += sCurrentLine;
			}
			System.out.println("==================="+ url);
			System.out.println("==================="+ rtn);
			System.out.println("==================="+ des.decrypt(rtn));
			return rtn;
		} catch (Exception e) {
			System.out.println("ERROR to URL: "+url);
			System.out.println(rtn);
		} 
		return "";
    }
    

}
