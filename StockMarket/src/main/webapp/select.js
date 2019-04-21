
var app = angular.module("StockManagement", ["ui.grid"]);
    var colDefs = [
       
		{name: 'symbol',displayName:'Symbol',width:95,enableColumnMenus:false,enableSorting:false,cellTemplate:'<div>' +
            '<a style="text-decoration:none;" ng-href="" ng-click="grid.appScope.getCompanyData(row.entity.symbol);">{{row.entity.symbol}}</a>' +
        '</div>'},                         
		{name: 'companyName',width:245,enableColumnMenus:false,enableSorting:false},
		{name: 'sector',displayName:'Sector',width:150,enableFiltering:false},
		{name:'marketCap',width:120,enableFiltering:false},
		{name:'latestPrice',displayName:'Price',width:80,enableFiltering:false},
		{name:'high',width:75,enableFiltering:false},
		{name:'low',width:75,enableFiltering:false},
		{name:'ytdChange',width:230,enableFiltering:false},
		{ name: 'Save',enableFiltering:false, cellTemplate:'<button "height:10px;width:18px" class="btn primary" ng-click="grid.appScope.saveStock(row.entity)">Save</button>',width:85,padding: 10,align:"center",cellClass: 'text-center'}

                ];
    var savedColDefs = [
        
		{name: 'symbol',displayName:'Symbol',width:95,enableColumnMenus:false,enableSorting:false},             
		{name: 'companyName',width:230,enableColumnMenus:false,enableSorting:false},
		{name: 'sector',displayName:'Sector',width:150,enableFiltering:false},
		{name:'marketCap',width:120,enableFiltering:false},
		{name:'latestPrice',displayName:'Price',width:80,enableFiltering:false},
		{name:'high',width:75,enableFiltering:false},
		{name:'low',width:75,enableFiltering:false},
		{name:'ytdChange',displayName:'ytd',width:90,enableFiltering:false},
		{name:'ts',width:200,enableFiltering:false},
		{ name: 'Delete',enableFiltering:false, cellTemplate:'<button "height:10px;width:18px" class="btn primary" ng-click="grid.appScope.deleteStock(row.entity)">Delete</button>',width:85,padding: 10,align:"center",cellClass: 'text-center'}

                ];
    var AllcolDefs = [
        
		{name: 'symbol',displayName:'Symbol',width:95,enableColumnMenus:false,enableSorting:false},
		{name: 'companyName',width:310,enableColumnMenus:false,enableSorting:false},
		{name: 'sector',displayName:'Sector',width:150,enableFiltering:false},
		{name:'marketCap',width:140,enableFiltering:false},
		{name:'latestPrice',displayName:'Price',width:80,enableFiltering:false},
		{name:'high',width:75,enableFiltering:false},
		{name:'low',width:75,enableFiltering:false},
		{name:'ytdChange',width:230,enableFiltering:false},

                ];

			  var saveD="";
			  
            //Controller Part
            app.controller("StockController", function($scope, $http) {
				
				//=======================
            	var userLogged=window.location.hash.substring(1);
            	alert("Welcome "+userLogged);

 var large=["AAPL","FB","MSFT","RACE","FTS","IT","HCP","RSG","RCL","TIF","UN","BAP","HDP","MRK","PRA","VEDL","ZTO"];
         
			   var allCaps=["DDD","ASIX","BIT","MUC","CIA","ETO","FGP","GME","GNL","IO","KYE","LNN","NRP","TDY","SNX","RRC","RXN","SNDR","SCI","OA","MSA","NEU","KFY","LII","HRI","JLL","AQN","CIG","DCP","EDR","AAPL","FB","MSFT","RACE","FTS","IT","HCP","RSG","RCL","TIF","UN","BAP","HDP","MRK","PRA","VEDL","ZTO","LXP","DOOR","PZN","SGY"];
               var small=["DDD","ASIX","BIT","MUC","CIA","ETO","FGP","GME","GNL","IO","KYE","LNN","NRP","LXP","DOOR","PZN","SGY"];
               var mid=["TDY","SNX","RRC","RXN","SNDR","SCI","OA","MSA","NEU","KFY","LII","HRI","JLL","AQN","CIG","DCP","EDR"];

               $scope.gridOptionsAll = {
                       onRegisterApi: function (gridApi) {
                         $scope.gridApi = gridApi;
                       },
               		rowHeight:42,
               		enableColumnMenus:false,
               		enableSorting:true,
                      	showGridFooter: true,
                      	showColumnFooter: false,
                      	enableFiltering: true,
                    	//enableHorizontalScrollbar: 0,
                    	//enableVerticalScrollbar: 2,
                    	enableScrollBars:false
                     };
                $scope.refreshStockData=function() {
                    $http({
                        method : 'GET',
                        url : 'https://api.iextrading.com/1.0/stock/market/batch?symbols=DDD,ASIX,BIT,MUC,CIA,ETO,FGP,GME,GNL,IO,KYE,LNN,NRP,TDY,SNX,RRC,RXN,SNDR,SCI,OA,MSA,NEU,KFY,LII,HRI,JLL,AQN,CIG,DCP,EDR,AAPL,FB,MSFT,RACE,FTS,IT,HCP,RSG,RCL,TIF,UN,BAP,HDP,MRK,PRA,VEDL,ZTO,LXP,DOOR,PZN,SGY&types=quote'
                    }).then(function successCallback(response) {
                      $scope.stocks = response.data;
                      console.log( $scope.stocks);
                      $scope.allArr=[{}];//change to all array
                      
                      	for(var i=0;i<allCaps.length;i++)
                        {
                        	$scope.allArr[i]=$scope.stocks[allCaps[i]].quote;
                        }
                      	$scope.gridOptionsAll.columnDefs=AllcolDefs;
                      	$scope.gridOptionsAll.excessRows=200;
                       $scope.gridOptionsAll.data=$scope.allArr; //setting all cap data in grid*/
                       console.log( $scope.allArr);
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    }); 
              }//end of _refreshStockData
					$scope.refreshStockData();
document.getElementById("defaultOpen").click();
					//function to make array of saved companies
				$scope.saveStock = function(row)
				{
				  if(confirm("Sure you want to save?"))
				  {
					 $scope.saveData={
							 "username":userLogged,
							 "symbol":row.symbol,
							 "companyName":row.companyName,
							 "sector":row.sector,
							 "marketCap":row.marketCap,
							 "latestPrice":row.latestPrice,
							 "high":row.high,
							 "low":row.low,
							 "ytdChange":row.ytdChange
					 };
					 console.log($scope.saveData);

					 sendToDB();
				  }
				 
                };//end of save stock
				
              //function to delete saved data companies
				$scope.deleteStock = function(row)
				{
				  if(confirm("Sure you want to delete?"))
				  {
					 $scope.delData={
							 
							 "symbol":row.symbol,
							 "companyName":row.companyName,
							 "sector":row.sector,
							 "marketCap":row.marketCap,
							 "latestPrice":row.latestPrice,
							 "high":row.high,
							 "low":row.low,
							 "ytdChange":row.ytdChange,
							 "ts":row.ts
					 };
					 console.log($scope.delData);

					 sendToDelete();
				  }
				 
                };//end of delete stock
                
                
				function sendToDB() {                	
                    $http({
                        method : "POST",
                        url : 'rest/save',
                        data : angular.toJson($scope.saveData),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );  
                };
				
				 function _success(response) {
                	if(response.data==1)
                	{
						alert("data added");
						//$scope.getsaveData();
                	}
                }
				 function _error(response) {
                    console.log(response.statusText);
                }
				 

					function sendToDelete() {                	
	                    $http({
	                        method : "DELETE",
	                        url : 'rest/save/delete/'+userLogged,
	                        data : angular.toJson($scope.delData),
	                        headers : {
	                            'Content-Type' : 'application/json'
	                        }
	                    }).then(function successCallback(response) {
	                    	alert('Deleted');
	                    	$scope.getSaveData();
	                    	
	                    }, function errorCallback(response) {
	                        console.log(response.statusText);
	                    });  
	                };
	                $scope.gridOptions = {
	                        onRegisterApi: function (gridApi) {
	                          $scope.gridApi = gridApi;
	                        },
	                		rowHeight:42,
	                		enableColumnMenus:false,
	                		enableSorting:true,
	                       	showGridFooter: true,
	                       	showColumnFooter: false,
	                       	enableFiltering: true,
	                     	//enableHorizontalScrollbar: 0,
	                     	//enableVerticalScrollbar: 2,
	                     	enableScrollBars:false
	                      };
				 //-----------------------------------------------
				 $scope.getSaveData=function()
				 {
					 $http({
	                        method : 'GET',
	                        url : 'rest/save/myData/'+userLogged
	                    }).then(function successCallback(response) {
	                    	$scope.stockList=response.data;
	                    	
	                      if($scope.stockList.length==0){
	                    	   document.getElementById("saveID").innerHTML = "<p align='center'>No Saved Stocks Yet!</p>";
	                    	   document.getElementById("NoSaved").style.visibility = "hidden";
	                      }
	                      else{document.getElementById("saveID").innerHTML = "<p align='center'>Your Records</p>";
	                      document.getElementById("NoSaved").style.visibility = "visible";
	                      }
	                    	   $scope.gridOptions.columnDefs=savedColDefs;
		                      	$scope.gridOptions.data=$scope.stockList;
		                      	$scope.gridOptions.minRowsToShow=$scope.gridOptions.data.length;
		                       console.log($scope.stockList);
		                      
	                    	 
			               	var modal = document.getElementById('saveModal');
			               modal.style.display = "block";
			               window.onclick = function(event) 
			               {
			            	    if (event.target == modal) {
			            	        modal.style.display = "none";
			            	    }
			            	}
			               var span = document.getElementsByClassName("saveClose")[0];
	                       span.onclick = function() {
	                    	    modal.style.display = "none";
	                    	}
	                    }, function errorCallback(response) {
	                        console.log(response.statusText);
	                    });
				 }
				 
				 //----------------------------------------------------------------------------------
				 
				 
				//=============================================
 

 
$scope.gridOptionsSmall = {
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
        },
		rowHeight:42,
		enableColumnMenus:false,
		enableSorting:true,
       		showGridFooter: true,
       		showColumnFooter: true,
       		enableFiltering: true,
     		columnDefs: colDefs,
		//enableScrollBars: true,
		
      };

$scope.gridOptionsMid = {
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi; 
        },
		rowHeight:42,
		enableColumnMenus:false,
		enableSorting:true,
	        showGridFooter: true,
	        showColumnFooter: true,
		enableFiltering: true,
	     	columnDefs: colDefs,
		//enableScrollBars: true,
		
      };

$scope.gridOptionsLarge = {
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
        },
		rowHeight:42,
		enableColumnMenus:false,
		enableSorting: true,
		showGridFooter: true,
		showColumnFooter: true,
		enableFiltering: true,
	    columnDefs: colDefs,
		//enableScrollBars: true,
		
      };	  
              //Now load the data from server
               
                //getSmallCap();
				//getMidCap();
				//getLargeCap();
				
                
                
                  $scope.getSmallCap=function(){
                	 $http({
                         method : 'GET',
                         url : 'https://api.iextrading.com/1.0/stock/market/batch?symbols=DDD,ASIX,BIT,MUC,CIA,ETO,FGP,GME,GNL,IO,KYE,LNN,NRP,LXP,DOOR,PZN,SGY&types=quote'
                     }).then(function successCallback(response) {
                       $scope.stocks = response.data;
                       $scope.smallArr=[{}];
                       
                       	for(var i=0;i<small.length;i++)
                         {
						 $scope.smallArr[i]=$scope.stocks[small[i]].quote;
						 //console.log($scope.smallArr[i].symbol);
                         } 
                        $scope.gridOptionsSmall.data=$scope.smallArr; //setting all cap data in grid
                     }, function errorCallback(response) {
                         console.log(response.statusText);
                     });	
                }//end of smallArr
                
                 $scope.getMidCap=function(){
               	 $http({
                        method : 'GET',  
                        url : 'https://api.iextrading.com/1.0/stock/market/batch?symbols=TDY,SNX,RRC,RXN,SNDR,SCI,OA,MSA,NEU,KFY,LII,HRI,JLL,AQN,CIG,DCP,EDR&types=quote'
                    }).then(function successCallback(response) {
                      $scope.stocks = response.data;
                      $scope.midArr=[{}];
                     
                      	for(var i=0;i<mid.length;i++)
                        {
                        	$scope.midArr[i]=$scope.stocks[mid[i]].quote;
                        } 
                       $scope.gridOptionsMid.data=$scope.midArr; //setting all cap data in grid
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });	
               }//end of midCap
                
                     $scope.getLargeCap=function(){
                  	 $http({
                           method : 'GET',
                           url : 'https://api.iextrading.com/1.0/stock/market/batch?symbols=AAPL,FB,MSFT,RACE,FTS,IT,HCP,RSG,RCL,TIF,UN,BAP,HDP,MRK,PRA,VEDL,ZTO&types=quote'
                       }).then(function successCallback(response) {
                         $scope.stocks = response.data;
                         $scope.largeArr=[{}];
                         	for(var i=0;i<large.length;i++)
                           {
                           	$scope.largeArr[i]=$scope.stocks[large[i]].quote;
                           } 
                          $scope.gridOptionsLarge.data=$scope.largeArr; //setting all cap data in grid
                       }, function errorCallback(response) {
                           console.log(response.statusText);
                       });	
                  }//end of largeCap
				  
				  //Recommendations for selected Cap
				   $scope.passSmall=function(){
                	  bestStocksCommon($scope.smallArr);
                		$scope.gridOptionsSmall.columnDefs=colDefs;
						
                	  $scope.gridOptionsSmall.data=$scope.finalArr;
                	  
                  }
                  $scope.passMid=function(){
                	  bestStocksCommon($scope.midArr);
                		$scope.gridOptionsMid.columnDefs=colDefs;
						
                	  $scope.gridOptionsMid.data=$scope.finalArr;
                  }
                  $scope.passLarge=function(){
                	  bestStocksCommon($scope.largeArr);
                		$scope.gridOptionsLarge.columnDefs=colDefs;
						
                	  $scope.gridOptionsLarge.data=$scope.finalArr;
                  }
				  
				  function bestStocksCommon(data1){
                	  var n=data1.length;
                	 for(var i=0;i<n;i++){
                		 
                		for(var j=1;j<(n-i);j++)
                		{
                			if(data1[j-1].changePercent< data1[j].changePercent)
                			{
                				$scope.temp=data1[j-1];
                				data1[j-1]=data1[j];
                				data1[j]=$scope.temp
                			}
                		}
                	 }
                		n=n/2;
                		for(var i=0;i<n;i++){
                   		 
                    		for(var j=1;j<(n-i);j++)
                    		{
                    			if((data1[j-1].peRatio> data1[j].peRatio)&& (data1[j-1].peRatio>0 && data1[j].peRatio))
                    			{
                    				$scope.temp=data1[j-1];
                    				data1[j-1]=data1[j];
                    				data1[j]=$scope.temp
                    			}
                    		}
                		
                	 }
                		
                		$scope.finalArr=[{}];
                		for(var i=0;i<5;i++)
                		{
                			$scope.finalArr[i]=data1[i];	
							console.log("\n"+$scope.finalArr[i].symbol);
                		}
                	
						
              }
				 $scope.getCompanyData=function(companyNm){
		               	
		               	 $http({
		                        method : 'GET',  
		                        url : 'https://api.iextrading.com/1.0/stock/market/batch?symbols='+companyNm+'&types=quote'
		                    }).then(function successCallback(response) {
		                      $scope.stocks = response.data[companyNm].quote;
		                      
		                     console.log( $scope.stocks);
		                     document.getElementById('myID').innerHTML="KEY STOCK DATA:<br><p>Company Name :"+$scope.stocks.companyName+
		                    	 "<br>Symbol :"+$scope.stocks.symbol+
		                    	 "<br>Sector :"+$scope.stocks.sector+
		                    	 "<br>Market Cap :"+$scope.stocks.marketCap+
					             "<br>Open :"+$scope.stocks.open+
						         "<br>Close :"+$scope.stocks.close+
							     "<br> PE Ratio:"+$scope.stocks.peRatio+
		                    	"<br>Previous Close :" +$scope.stocks.previousClose+
		                    	"<br>Calculation Price :" +$scope.stocks.calculationPrice+
		                    	 "</p>";
		                     
				               	var modal = document.getElementById('myModal');
				               modal.style.display = "block";
				               window.onclick = function(event) 
				               {
				            	    if (event.target == modal) {
				            	        modal.style.display = "none";
				            	    }
				            	}
				               var span = document.getElementsByClassName("close")[0];
		                       span.onclick = function() {
		                    	    modal.style.display = "none";
		                    	}
		                    }, function errorCallback(response) {
		                        console.log(response.statusText);
		                    });	
		               	
					  }   
			});
            
function openStock(evt, stockCap) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(stockCap).style.display = "block";
    evt.currentTarget.className += " active";
}

//=============================
