var dtable = {
  ""   :0b000,
  "M"  :0b001,
  "D"  :0b010,
  "MD" :0b011,
  "A"  :0b100,
  "AM" :0b101,
  "AD" :0b110,
  "AMD":0b111
};

var jtable = {
  ""   :0b000,
  "JGT":0b001,
  "JEQ":0b010,
  "JGE":0b011,
  "JLT":0b100,
  "JNE":0b101,
  "JLE":0b110,
  "JMP":0b111
};

var ctable = {
  "0"   :0b0101010,
  "1"   :0b0111111,
  "-1"  :0b0111010,
  "D"   :0b0001100,
  "A"   :0b0110000, 
  "M"   :0b1110000,
  "!D"  :0b0001101,
  "!A"  :0b0110001, 
  "!M"  :0b1110001,
  "-D"  :0b0001111,
  "-A"  :0b0110011,
  "-M"  :0b1110011,
  "D+1" :0b0011111,
  "A+1" :0b0110111,
  "M+1" :0b1110111,
  "D-1" :0b0001110,
  "A-1" :0b0110010,
  "M-1" :0b1110010,
  "D+A" :0b0000010,
  "D+M" :0b1000010,
  "D-A" :0b0010011,
  "D-M" :0b1010011,
  "A-D" :0b0000111,
  "M-D" :0b1000111,
  "D&A" :0b0000000,
  "D&M" :0b1000000,
  "D|A" :0b0010101,
  "D|M" :0b1010101
};

var symTable = {
  "R0"  :0,
  "R1"  :1,
  "R2"  :2,
  "R3"  :3,
  "R4"  :4,
  "R5"  :5,
  "R6"  :6,
  "R7"  :7,
  "R8"  :8,
  "R9"  :9,
  "R10" :10,
  "R11" :11,
  "R12" :12,
  "R13" :13,
  "R14" :14,
  "R15" :15,
  "SP"  :0,
  "LCL" :1,
  "ARG" :2,
  "THIS":3, 
  "THAT":4,
  "KBD" :24576,
  "SCREEN":16384
};


var fs = require('fs');
log = console.log;
var a = 16;	//A
var b = 0;	//loop




var text = fs.readFileSync(process.argv[2], "utf8");	
var writeword = process.argv[2] +'.hack';
//log(text);
var text_row = text.split(/\r?\n/);			//弄成一行一行
//log(text_row);


for(i=0; i<text_row.length; i++)
{
	var text_single = text_row[i];
	
	text_single.match(/^([^\/]*)(\/.*)?$/);
	text_single = RegExp.$1.trim();
	
	if(text_single.length != 0)
	{
		log(text_single);
	}
	
	
	var category;
	if(text_single.startsWith("@"))
	{
		category = "A";
		A_cat(text_single);
	}
	else if (text_single.match(/^\(([^\)]+)\)$/))
	{
		category = "S";
		S_cat(text_single);

	}	
	else if (text_single.match(/^((([AMD]*)=)?([AMD01\+\-\&\|\!]*))(;(\w*))?$/))
	{
		category = "C";
		C_cat(text_single);
	}			
	
}

function A_cat(num)
{
	var num = num.split("@");

	if(num[1].match(/^\d+$/))
	{
		num[1] = num[1] - 0;
		var numto2 = num[1].toString(2);
		var complement0 = 16 - (numto2.length);
		
		for(let i=0;i < complement0; i++)
		{
		   numto2 = "0"+ numto2;
		}
		log(category,numto2);
		fs.appendFileSync(writeword,numto2 + '\n');
	}
	
	else
	{
		var	sym = symTable[num[1]];
		
		
		if(sym != undefined)
		{
			sym = sym - 0;
			var symto2 = sym.toString(2);
			
			var complement0 = 16 - (symto2.length);
			
			for(let i=0; i < complement0; i++)
			{
				symto2 = "0"+ symto2;
			}
			
			log(symto2);
			
		}
		
		else
		{
			symTable[num[1]] = a;  
			
			var symto2 = a.toString(2);
			
			var complement0 = 16 - (symto2.length);
			
			for(let i=0; i < complement0; i++)
			{
				symto2 = "0"+ symto2;
			}
			
			log(symto2);
			a++;
		}		
	fs.appendFileSync(writeword,symto2 + '\n');	
		
	}
		
		
		
}

function S_cat()
{
	loo = text_single.match(/^\(([^\)]+)\)$/);
	log(loo[1]);
	
	if(b < text_row.length)	
	{
		symTable[loo[1]] = i;
		var looto2 = i.toString(2);
		var complement0 = 16 - (looto2.length);
			
		for(let i=0; i < complement0; i++)
		{
			looto2 = "0"+ looto2;
		}	
	log(looto2);
	}
	
	else
	{
		b++;
	}
}

function C_cat()
{
	
	if(text_single.indexOf("=") != -1)
	{
		var z=text_row[i].split('=');
		z[0] = z[0].trim();
		var binary = 0B111<<13|ctable[z[1]] <<6|dtable[z[0]]<<3|0b000;
		binary = binary.toString(2);
		p= z[0].toString();
		log(binary);
	}
	
	else if(text_single.indexOf(";") != -1)
	{
		var k=text_row[i].split(';');
	var binary = 0b111<<13|ctable[k[0]]<<6|0b000<<3|jtable[k[1]];
		binary = binary.toString(2);
		log(binary);	
	}
	
	fs.appendFileSync(writeword,binary + '\n');
	
}









































