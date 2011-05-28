var count1;
var count2;
var count3;
var count4;
var numFriends=10;
var chances=4;
var level=1;
var frndsFinished=0;
var cellcounter=1;
var timeSeconds=0;
var timeout;
var timer_is_on=0;

$(document).ready(function(){
start();
$("#instructions").show();
});

$(function() {
		$( "#instructions").dialog();
	});

function start(){
doTimer();
chances=5-level;
createKeys();
$("#endInstructions").hide();
$("#chances").text("Lives:"+chances);
$("#levelNum").text("Level:"+level);
$(".picframe").hide();
$( "#pic1" ).attr("src","");
$("#pic1").hide();
$( "#pic2" ).attr("src","");
$("#pic2").hide();
$( "#pic3" ).attr("src","");
$("#pic3").hide();
$( "#pic4" ).attr("src","");
$("#pic4").hide();

$("#keyboard").show();
$("#finished").hide();
var rand = Math.floor(Math.random()*(numFriends));
var myjson = friendsArr[rand];
var name1=myjson.name;
name1=name1.toUpperCase();
var id=myjson.id;
var piclink ;
if(level==1) piclink="https://graph.facebook.com/"+id+"/picture?type=large";
else piclink="https://graph.facebook.com/"+id+"/picture?type=normal";
$( "#pic1" ).attr("src",piclink);
$( "#pic1" ).attr("title",name1);
count1=name1.length;
var sp = name1.countchar(" ");
name1 = name1.replace(/ /g,'0');
count1=count1-sp;
createTable(name1,1);
friendsArr.splice(rand,1);
numFriends--;
if(level>1){
rand = Math.floor(Math.random()*(numFriends));
myjson = friendsArr[rand];
var name2=myjson.name;
name2=name2.toUpperCase();
id=myjson.id;
piclink="https://graph.facebook.com/"+id+"/picture?type=normal";
$( "#pic2" ).attr("src",piclink);
$( "#pic2" ).attr("title",name2);
count2=name2.length;
sp = name2.countchar(" ");
name2 = name2.replace(/ /g,'0');
count2=count2-sp;
createTable(name2,2);
friendsArr.splice(rand,1);
numFriends--;
} //end of level>1
if(level>2){
rand = Math.floor(Math.random()*(numFriends));
myjson = friendsArr[rand];
var name3=myjson.name;
name3=name3.toUpperCase();
id=myjson.id;
piclink="https://graph.facebook.com/"+id+"/picture?type=normal";
$( "#pic3" ).attr("src",piclink);
$( "#pic3" ).attr("title",name3);
count3=name3.length;
sp = name3.countchar(" ");
name3 = name3.replace(/ /g,'0');
count3=count3-sp;
createTable(name3,3);
friendsArr.splice(rand,1);
numFriends--;
} //end of level>2
if(level>3){
rand = Math.floor(Math.random()*(numFriends));
myjson = friendsArr[rand];
var name4=myjson.name;
name4=name4.toUpperCase();
id=myjson.id;
piclink="https://graph.facebook.com/"+id+"/picture?type=normal";
$( "#pic4" ).attr("src",piclink);
$( "#pic4" ).attr("title",name3);
count4=name4.length;
sp = name4.countchar(" ");
name4 = name4.replace(/ /g,'0');
count4=count4-sp;
createTable(name4,4);
friendsArr.splice(rand,1);
numFriends--;
} //end of level>3
}

function createKeys() {

 var Parent = document.getElementById("keyboard");
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}
        var row1 = ['Q','W','E','R','T','Y','U','I','O','P'];
		var row2 = ['A','S','D','F','G','H','J','K','L'];
		var row3 = ['Z','X','C','V','B','N','M'];
        var keyboard = $("#keyboard");
		var divrow1 = $("<div>");
		divrow1.addClass("row1");
		divrow1.attr("align","center");

		for(var i=0; i<row1.length; i++){
		   var temp = row1[i];
		   divrow1.append("<input type=\"button\" class=\"keys\" value=\""+temp+"\">");
		}
		divrow1.appendTo(keyboard);

		var divrow2 = $("<div>");
		divrow2.addClass("row1");
		divrow2.attr("align","center");

		for(var i=0; i<row2.length; i++){
		var temp = row2[i];
		   divrow2.append("<input type=\"button\" class=\"keys\" value=\""+temp+"\">");
		}
		divrow2.appendTo(keyboard);

		var divrow3 = $("<div>");
		divrow3.addClass("row1");
		divrow3.attr("align","center");
		var temp;
		for(var i=0; i<row3.length; i++){
		var temp = row3[i];
		   divrow3.append("<input type=\"button\" class=\"keys\" value=\""+temp+"\">");
		}
		divrow3.appendTo(keyboard);


        $('.keys').removeClass('ui-state-hover');
		$('.keys').removeClass('ui-state-focus');

		$( ".keys" ).button();
		$( ".keys" ).button( "option", "disabled", false);
		$( ".keys" ).click(function() { $(this).button( "option", "disabled", true );
		var temp= $(this).val();
		clicked(temp);
		});
	}

function clicked(key) {
var sel="[class=\"celldiv1\"][id^=\""+key+"\"]";
var c1 = $(sel).length;
sel="[class=\"celldiv2\"][id^=\""+key+"\"]";
var c2 = $(sel).length;
sel="[class=\"celldiv3\"][id^=\""+key+"\"]";
var c3 = $(sel).length;
sel="[class=\"celldiv4\"][id^=\""+key+"\"]";
var c4 = $(sel).length;
var c=c1+c2+c3+c4;
if(c==0) {
chances--;
$("#chances").effect( "blind", {}, 100 );
$("#chances").text("Lives:"+chances);
$("#chances").removeAttr( "style" ).hide().fadeIn();
if(chances==0){ //lost the game, show names,pic
$(".picframe").show();
 var delcontains = $(".celldiv1:contains('-')").length;
 if(delcontains>0) $("#pic1").show();
  while(delcontains){
	var sel = $(".celldiv1:contains('-')").first();
	var elem = sel.attr("id");
	elem = elem.substr(0,1);
	sel.text(elem);
	sel.css("background","#A74747");
	delcontains = $(".celldiv1:contains('-')").length;
 }

 delcontains = $(".celldiv2:contains('-')").length;
 if(delcontains>0) $("#pic2").show();
  while(delcontains){
	var sel = $(".celldiv2:contains('-')").first();
	var elem = sel.attr("id");
	elem = elem.substr(0,1);
	sel.text(elem);
	sel.css("background","#A74747");
	delcontains = $(".celldiv2:contains('-')").length;
 }

 delcontains = $(".celldiv3:contains('-')").length;
 if(delcontains>0) $("#pic3").show();
  while(delcontains){
	var sel = $(".celldiv3:contains('-')").first();
	var elem = sel.attr("id");
	elem = elem.substr(0,1);
	sel.text(elem);
	sel.css("background","#A74747");
	delcontains = $(".celldiv3:contains('-')").length;
 }

 delcontains = $(".celldiv4:contains('-')").length;
 if(delcontains>0) $("#pic4").show();
  while(delcontains){
	var sel = $(".celldiv4:contains('-')").first();
	var elem = sel.attr("id");
	elem = elem.substr(0,1);
	sel.text(elem);
	sel.css("background","#A74747");
	delcontains = $(".celldiv4:contains('-')").length;
 }

gameLost();

}
return;
}
// consider checking only if count>0 (is to be unhidden) else frndsFinished is incrimented unnecessarily.

if(count1>0){ sel="[class=\"celldiv1\"][id^=\""+key+"\"]";
count1=count1-c1;
$(sel).text(key);
if(count1<=0) { //first frnd is unhidden
$("#instructions").dialog( "destroy" )
$("#instructions").hide();
$(".picframe").show();
$("#pic1").show(500);
frndsFinished++;
if(frndsFinished == level)
levelOver();
}
else  {
$(sel).effect( "bounce", {}, 500);
} }
//end of level 1
if(level>1 && count2>0){
sel="[class=\"celldiv2\"][id^=\""+key+"\"]";
count2=count2-c2;
$(sel).text(key);
if(count2<=0) { //second frnd is unhidden
$(".picframe").show();
$("#pic2").show(500);
frndsFinished++;
if(frndsFinished == level)
levelOver();
}
else  {
$(sel).effect( "bounce", {}, 500);
}
} //level 2 done
if(level>2 && count3>0){
sel="[class=\"celldiv3\"][id^=\""+key+"\"]";
count3=count3-c3;
$(sel).text(key);
if(count3==0) { //second frnd is unhidden
$(".picframe").show();
$("#pic3").show(500);
frndsFinished++;
if(frndsFinished == level)
levelOver();
}
else  {
$(sel).effect( "bounce", {}, 500);
}
} //end of level 3

if(level>3 && count4>0){
sel="[class=\"celldiv4\"][id^=\""+key+"\"]";
count4=count4-c4;
$(sel).text(key);
if(count4==0) { //4th frnd is unhidden
$(".picframe").show();
$("#pic4").show(500);
frndsFinished++;
if(frndsFinished == level)
levelOver();
}
else  {
$(sel).effect( "bounce", {}, 500);
}
} //end of level 4
};

function levelOver(){
stopCount();
$("#keyboard").hide();
$("#finished").text("Congrats!! You finished level "+level);
if(level==4){
gameOver();
return;
}
level++;
frndsFinished=0;
$("#finished").show(200);
$("#finished").effect("fade",{}, 4000, start);

}

function gameLost(){
stopCount();
$( ".keys" ).hide();
$("#finished").text("OOPS!!! No more chances, Try again");
$("#finished").show(3000);
$("#finished").effect("fade",{}, 2000, endInstructions);

}

function gameOver(){
stopCount();
$( ".keys" ).button( "option", "disabled", true);
$("#finished").text("Congrats!! You've finished the game in "+timeSeconds+" seconds");
$("#finished").show(200);
$("#finished").effect("fade",{}, 2000, endInstructions);

}

function endInstructions(){
$( ".keys" ).hide();
$("#tb1").hide();
$("#tb2").hide();
$("#tb3").hide();
$("#tb4").hide();
$("#endInstructions").show();
        $( "#likePage" ).button();
		$( "#likePage" ).button( "option", "disabled", false);
		$( "#likePage" ).click(function() { $(this).button( "option", "disabled", true );

		});

		$( "#postResult" ).button();
		$( "#postResult" ).button( "option", "disabled", false);
		$( "#postResult" ).click(function() { $(this).button( "option", "disabled", true );

		});

		$( "#playAgain" ).button();
		$( "#playAgain" ).button( "option", "disabled", false);
		$( "#playAgain" ).click(function() { $(this).button( "option", "disabled", true );

		});
}


 function createTable(name,tablenum) {

 //delete if there are rows alreadyy..
 var Parent = document.getElementById("tb"+tablenum);
while(Parent.hasChildNodes())
{
   Parent.removeChild(Parent.firstChild);
}

 var tabname = "#tb"+tablenum;
 var tbody=$(tabname);
 var celldiv = "celldiv"+tablenum;
//if (tbody == null || tbody.length < 1){alert ("nulll"+tbody.length); return;}
var n='-';
var trow = $("<tr>");
for (var i = 0, len = name.length; i < len; i++) {
$("<td>")
.addClass("tableCell")
.append("<div class = \""+celldiv+"\" id=\""+name[i]+""+(cellcounter++) +"\">"+n+"</div>")
.appendTo(trow);
}
trow.appendTo(tbody);
var sel="[."+celldiv+"][id^=\"0\"]";
$(sel).text(' ');
}


function timedCount()
{
$("#timeTaken").text(timeSeconds);
timeSeconds=timeSeconds+1;
timeout=setTimeout("timedCount()",1000);
}

function doTimer()
{
if (!timer_is_on)
  {
  timer_is_on=1;
  timedCount();
  }
}

function stopCount()
{
clearTimeout(timeout);
timer_is_on=0;
}

String.prototype.countchar=function(s1) {
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}


