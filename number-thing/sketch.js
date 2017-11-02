var num =0, combo =[], results=[], counts=[];

var dieType = new Die(6);

function listCount(arr) {
    var unique = [], count = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            unique.push(arr[i]);
            count.push(1);
        } else {
            count[count.length-1]=count[count.length-1]+1;
        }
        prev = arr[i];
    }

    return [unique, count];
}

var forCounters =[];
var forLevels=[];

function permutateThreeSums (die) {
	var sums =[],prod =0;
	for (i=0; i<die.length; i++){
		for (j=i; j<die.length; j++){
			for (k=j; k<die.length; k++){
				num++;
				prod = die[i]+die[j]+die[k];
				sums.push(prod);
				
				}
			}
		}
	
	return sums;
}

function permutateThreeList (die) {
	var list=[];
	for (i=0; i<die.length; i++){
		for (j=i; j<die.length; j++){
			for (k=j; k<die.length; k++){
				list.push("("+die[i]+","+die[j] +","+die[k]+")");				
				}
			}
		}
	
	return list;
}


combo=listCount(permutateThreeList(dieType);
results=combo[0];
counts=combo[1];





num =0;
prod =0;
var two=0;
three=0;
four=0;
five=0;
six=0;
seven=0;
eight=0;
nine=0;
ten=0;
eleven=0;
twelve=0;
thirteen=0;
fourteen=0;
fifteen=0;
sixteen=0;
seventeen=0;
eighteen=0;
	
for (i=0; i<6; i++){
    for (j=i; j<6; j++){
        
            document.write("("+die[i]+","+die[j]+")");
            num++;
            prod = die[i]+die[j];
            
            switch (prod){
				case 2: two++;break;
                case 3: three++;break;
                case 4: four++;break;
                case 5: five++;break;
                case 6: six++;break;
                case 7: seven++;break;
                case 8: eight++;break;
                case 9: nine++;break;
                case 10: ten++;break;
                case 11: eleven++;break;
                case 12: twelve++; break;
                
            }
            
        }
        document.write("</br>");
    }
    document.write("</br>");


