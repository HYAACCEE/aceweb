package com.svv.dms.web.biz;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;
import java.util.Map;
import java.util.Set;

import com.jeesoon.struts.beanaction.ActionContext;
import com.svv.dms.web.service.base.AbstractBean;
import com.svv.dms.web.service.base.BConstants;
import com.svv.dms.web.util.DES;
import com.svv.dms.web.util.HIUtil;
import com.svv.dms.web.util.JsonUtil;


public class HIOnlineBean extends AbstractBean {
    final static int BUFFER_SIZE = 4096;
    //final static String SERVER = "http://120.27.249.104:8099/aceserver/";//正式平台
    //final static String SERVER = "http://118.178.126.204:8099/aceserver/";
    final static String SERVER = "http://118.178.126.204:8088/aceserver/";
    //final static String SERVER = "http://127.0.0.1:8099/aceserver/";
    //final static String SERVER = "http://127.0.0.1:8080/aceserver/";
    //final static String SERVER = "http://192.168.0.102:8099/aceserver/";
    //final static String SERVER = "http://192.168.0.122:80/aceserver/";
	final static DES des = new DES();
	
	public static void main(String[] args){
		System.out.println("123:"+HIOnlineBean.des.encrypt("123"));
		System.out.println("test:"+HIOnlineBean.des.encrypt("test"));
		System.out.println("测试:"+HIOnlineBean.des.encrypt("测试"));
	}

	public String HIOnline(){
		return this.exeByCmd("");
	}
	
	public String autoComplete(){
		String rtn = APPLY_URL("HIService.y?cmd=autoComplete", String.format("{a0:'%s',mid:'%s',amid:'%s',obj:'%s',data:'%s',keyword:'%s'}", new Object[]{this.getParameter("auid"), this.getParameter("mid"), this.getParameter("amid"), this.getParameter("obj"), this.getParameter("data"), this.getParameter("query")}));
        this.setMessage(true, rtn.substring(2));
		return BConstants.MESSAGE;
	}
	public String onlog(){
		String ip = ActionContext.getActionContext().getRequest().getRemoteAddr();
		String referer = ActionContext.getActionContext().getRequest().getHeader("Referer");
		String user_agent = ActionContext.getActionContext().getRequest().getHeader("user-agent");
		String log = this.getParameter("log");
		String rtn = APPLY_URL("HIService.y?cmd=onlog", String.format("{a0:'%s',mid:'%s',amid:'%s',title:'%s',log:'[ONLOG-%s] %s %s %s %s'}", new Object[]{this.getParameter("auid"), this.getParameter("mid"), this.getParameter("amid"), log, ActionContext.getActionContext().getRequest().getSession().getId(), log, ip, referer, user_agent}));
		this.setMessage(true, rtn);
		return BConstants.MESSAGE;
	}
	public String ajaxFile(){
		String url = formatUrl(this.getParameter("applyUrl"));
		String param = formatParam(this.getParameter("applyParam"), true);
		System.out.println(HIUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + " ==================="+ url+" "+param);
		StringBuilder s = new StringBuilder();
		s.append("var formData = new FormData();\n");
		try{
			Map<String, String> map = JsonUtil.getMap4Json(param);
			Set<String> keys = map.keySet();
			int N = 0;
			int fileNum = -1;
			for(String key: keys){
				if(key.equals("fileNum")){
					fileNum = Integer.parseInt(map.get(key));
					for(int i=0; i<fileNum; i++){
						s.append(String.format("formData.append('file%s', $(\"#uploadFile%s\")[0].files[0]);\n", new Object[]{i+1, i+1}));
					}
					s.append(String.format("formData.append('N', %s);\n", new Object[]{fileNum}));
				}else if(fileNum==-1 && key.indexOf("file")>=0){
					N++;
					s.append(String.format("formData.append('%s', %s);\n", new Object[]{key, map.get(key)}));
				}else if(key.equals("M")){
					s.append(String.format("formData.append('%s', %s);\n", new Object[]{key, map.get(key)}));
				}else{
					s.append(String.format("formData.append('%s', '%s');\n", new Object[]{key, map.get(key)}));
				}
			}
			if(fileNum==-1) s.append(String.format("formData.append('N', %s);\n", new Object[]{N}));

		}catch(Exception e){
			logger.debug("JsonUtil Error: " + e.getMessage());
		}
		s.append("$.ajax({type: 'POST',\n url: '").append(url).append("',\n data: formData,\n async: false,cache: false,\n contentType: false,processData: false,\n success: function(res){\n if(sfun) sfun(res);\n},\n error: function(err){\n alert(err);\n}\n });");
		System.out.println(s.toString());
		this.setMessage(true, s.toString());
		return BConstants.MESSAGE;
	}
	
	public String desE(){
		System.out.println("[desE]"+this.getParameter("s0"));
		this.setMessage(true, dES.encrypt(this.getParameter("s0")));
		return BConstants.MESSAGE;
	}
	public String desD(){
		System.out.println("[desD]"+this.getParameter("s0"));
		this.setMessage(true, dES.decrypt(this.getParameter("s0")));
		return BConstants.MESSAGE;
	}
	public String md5(){
		System.out.println("[md5]"+this.getParameter("s0"));
		this.setMessage(true, DES.md5(this.getParameter("s0")));
		return BConstants.MESSAGE;
	}
	
	public String apply(){
		String applyUrl = this.getParameter("applyUrl"); //"SubjectService.y?cmd=piclist"
		String applyParam = this.getParameter("applyParam"); //"{a0:'160212132545157010159714662569',picGroup:'1'}"
		String rtn = APPLY_URL(applyUrl, applyParam);
		this.setMessage(true, rtn);
		return BConstants.MESSAGE;
	}
	
	private String formatParam(String param, boolean mFlag){
		String LOGINTIME = new Date().getTime()+"";
		String M = "M0:'H5WEB',M1:'',M2:'"+LOGINTIME+"',M3:'',M9:'"+(new Date()).getTime()+"'";
		if(mFlag) return param.replaceAll("}", String.format(", M:'%s'}", new Object[]{"\""+des.encrypt("{"+M+"}")+"\""}));
		else return param.replaceAll("}", String.format(", %s}", new Object[]{M}));
	}
	private String formatUrl(String url){
		return SERVER.concat(url.replaceAll("\\.y", "\\.r"));
	}
	
    private String APPLY_URL(String url, String param){
		System.out.println(HIUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + " ==================="+ url+" "+param);
		String rtn = "";
		try {
			param = formatParam(param, false);
			
			url = formatUrl(url);
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
			//System.out.println(HIUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + " ==================="+ rtn);
			System.out.println(HIUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + " ==================="+ des.decrypt(rtn));
			return des.decrypt(rtn);
		} catch (Exception e) {
			System.out.println(HIUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + " ERROR to URL: "+url);
		} 
		return null;
    }
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6610430582891427629L;

}
