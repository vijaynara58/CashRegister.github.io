//===================Global Variables=================//

var arrProducts = new Array("TV","Smart Phone","iPad","Laptop Computer","PlayStation 4");
var arrPrices = new Array(2000,1000,600, 1500, 500);
var arrOrderProductName = new Array();
var arrOrderPrices = new Array();
var arrOrderPriceWithQuantity = new Array();
var arrAddQuantity = new Array();
var orderSubTotal = 0;
var Gst;
var Pst;
var totalOfTheDay = 0;
var orderTotal = 0;
//===================Global Variables=================//
//===================Global Variables=================//




//===================Functions====================//


//Add product to left inputboxes in Aside-1
function fnFillInputs()
{
    document.getElementById('choice0').value = arrProducts[0];
    document.getElementById('choice1').value = arrProducts[1];
    document.getElementById('choice2').value = arrProducts[2];
    document.getElementById('choice3').value = arrProducts[3];
    document.getElementById('choice4').value = arrProducts[4];

    //Transfer items from combobox to user current item inputbox
    fnTransferFromCmbbox();

}


//Transfer selected product from left inputboxes to user current item inputbox
function fnTransfer(prod)
{
document.getElementById('ProdNameDestination').value = arrProducts[prod];
document.getElementById('ProdPriceDestination').value = arrPrices[prod];

}

//add EventListener to the combobox click to select options

function fnTransferFromCmbbox()
{
    document.getElementById("lstChoices").addEventListener("click", clicked);

    //======OR===============//

    /*document.getElementById("lstChoices").onclick = function()
    {
        var theList = document.getElementById("lstChoices");
        var theName = theList.options[theList.selectedIndex].text;
        var thePrice = theList.options[theList.selectedIndex].value;

        document.getElementById("ProdNameDestination").value = theName;
        document.getElementById("ProdPriceDestination").value = thePrice;
    }*/


    function clicked()
    {
        //alert("You clicked me.");
        var theList = document.getElementById("lstChoices");
        var theName = theList.options[theList.selectedIndex].text;
        var thePrice = theList.options[theList.selectedIndex].value;
        //var theQuantity = theList.options[theList.selectedIndex].value;

        document.getElementById("ProdNameDestination").value = theName;
        document.getElementById("ProdPriceDestination").value = thePrice;
        //document.getElementById('Prod');
    }
}

function fnverification()
{
    var prodDescription = document.getElementById('ProdNameDestination').value;

    var prodQty = document.getElementById('ProdQuantityDestination').value;

    var prodPrice = document.getElementById('ProdPriceDestination').value;

    var verif = true;

    if(prodDescription == "")
    {
        verif = false;
        alert("Product Name cannot be empty");      
        return false;
    }
    else if (prodPrice <= 0)
    {
        verif = false;
        alert("Enter something in the price");
        return false;
    }

    else if (isNaN(prodPrice))
    {
        verif = false;
        alert("Price should be an integer");
        return false;
    }

    for (var i=0; i < arrProducts.length; i++)
    {

        if (prodDescription == arrProducts[i])
        {
            verif = false;
            return false;
        }   
        
    }   

    if(verif = true)
        {
            //grab the entered values of the inputboxes
            var choices = document.getElementById("lstChoices");
            var addProd = document.createElement("Option");

            //add the new product to the array of product and price
            arrProducts.push(prodDescription.trim());
            arrPrices.push(prodPrice.trim());

            //add the product to the listbox
            addProd.innerHTML = prodDescription.trim();
            addProd.value = prodPrice.trim();

            //keep previous products in the list
            choices.appendChild(addProd);

            fnOk();
        }   

}


var showValue = function(val){
    document.getElementById('display').innerHTML += val;
}

function fnSendToQty()
{
    var a = document.getElementById('display').innerHTML;
    document.getElementById('ProdQuantityDestination').value = a;
}

function fnSendToPrice()
{
    var b = document.getElementById('display').innerHTML;
    document.getElementById('ProdPriceDestination').value = b;
}

function fnErase()
{
    document.getElementById('display').innerHTML = "";
    document.getElementById('ProdQuantityDestination').value = "";
    document.getElementById('ProdPriceDestination').value = "";
    document.getElementById('ProdNameDestination').value = "";
}
function fnOk()
{
    fnverification();
   fnAddToBill();
}

function fnAddToBill()
{
    var x = document.getElementById("ProdNameDestination").value;
    var y = document.getElementById("ProdPriceDestination").value;
    var z = document.getElementById("ProdQuantityDestination").value;

    var total = y * z;
    orderSubTotal = orderSubTotal + total;

    var choices = document.getElementById("myCommand");
    var addProd = document.createElement("option");         
    
    addProd.innerHTML = (x + ": " + y + "$ X " + z + " = " + total + "$");
    addProd.value = total;


    choices.appendChild(addProd);
    fnRefreshSubtotal();


}

function fnDelete()
{
    var selectedIndex = document.getElementById("myCommand").selectedIndex;
    var productTotal = document.getElementById("myCommand")[selectedIndex].value;

    //alert(productTotal);

    document.getElementById("myCommand").remove(selectedIndex);
    orderSubTotal -= productTotal;
    fnRefreshSubtotal();
}

function fnRefreshSubtotal()
{
    //alert(orderSubTotal);
    document.getElementById("theTotalAmount").innerHTML = orderSubTotal + "$";
    fnRefreshGstPst();
    fnTotalWithTaxes();

}


function fnRefreshGstPst()
{
    Gst = (5/100 * orderSubTotal);
    Pst = (9.98/100 * orderSubTotal);

    document.getElementById("theGST").innerHTML = Gst + "$";
    document.getElementById("thePST").innerHTML = Pst + "$";
}





function fnTotalWithTaxes()
{
    var totalAndTaxes = Gst + Pst;
    orderTotal = orderSubTotal + totalAndTaxes;
    document.getElementById("theFinalAmount").innerHTML = (orderSubTotal + totalAndTaxes).toFixed(2) + "$";
}

function fnCaluclateTotal()
{
    totalOfTheDay += orderTotal;
    document.getElementById("totalOfDay").value = totalOfTheDay.toFixed(2) + "$";
    
}

function fnCaltotal()
{
   document.getElementById("totalOfDay").value = "";
   document.getElementById("Totalday").innerHTML = totalOfTheDay.toFixed(2) + "$";
   
}

function fnResetEverything()
{
    document.getElementById("totalOfDay").value = "";
    document.getElementById("theTotalAmount").value = "";
}



