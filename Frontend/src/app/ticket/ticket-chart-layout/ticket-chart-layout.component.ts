import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-chart-layout',
  templateUrl: './ticket-chart-layout.component.html',
  styleUrls: ['./ticket-chart-layout.component.scss']
})
export class TicketChartLayoutComponent {
    public seatConfig: any = null;
    public seatmap:any[] = [];
    public  seatChartConfig = {
      showRowsLabel : true,
      showRowWisePricing : true,
      newSeatNoForRow : true
    }
    public cart:any = {
      selectedSeats: [],
      seatstoStore : [],
      totalamount : 0,
      cartId : "",
      eventId : 0
    };
    
  
    title = 'seat-chart-generator';
  
  
    ngOnInit(): void {
      //Process a simple bus layout
  //     this.seatConfig = [
  //   {
  //     "seat_price": 15,
  //     "seat_map": [
  //       {
  //         "seat_label": "N",
  //         "layout": "_____aaa_aaaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaa_____________"
  //       },
  //       {
  //         "seat_label": "M",
  //         "layout": "____aaaaa_aaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaaaa___________"
  //       },
  //       {
  //         "seat_label": "L",
  //         "layout": "___aaaaaa_aaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaaaaaa_________"
  //       },
  //       {
  //         "seat_label": "K",
  //         "layout": "__aaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaaa__aaaaaaaa________"
  //       },
  //       {
  //         "seat_label": "J",
  //         "layout": "_aaaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaaa__aaaaaaaaa_______"
  //       },
  //       {
  //         "seat_label": "I",
  //         "layout": "aaaaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaa___aaaaaaaaaa______"
  //       },
  //       {
  //         "seat_label": "H",
  //         "layout": "_eeeeeeeeeee_eeeeeeeeee_eeeeeeeeeeeeee_____eeeeeeeeeee_"
  //       },
  //       {
  //         "seat_label": " ",
  //         "layout": "__________________________"
  //       }
  //     ]
  //   },
   
  // ];
      const seats = 100
      const seats_sections =  seats/10 
      this.seatConfig = [
        {
          seat_price: 15,
          seat_map: [],
        },
        // {
        //   "seat_price": 250,
        //   "seat_map": [
        //     {
        //       "seat_label": "1",
        //       "layout": "gggggggggg"
        //     },
        //     {
        //       "seat_label": "2",
        //       "layout": "gggggggggg"
        //     },
        //   ]
        // }
      ]    
      const anavailable_seats = [4,5,6,12,22]
      let str = ''
      for (let i = 1; i <= seats-1; i++) {
        if(!anavailable_seats.includes(i)){
          str+='a'
        } else {
          str+=''
        }
      }
      this.seatConfig[0].seat_map.push({
            seat_label: 1,
            layout: str,
          });
  

      // for (let i = 1; i <= seats_sections-1; i++) {
      //   this.seatConfig[0].seat_map.push({
      //     seat_label: i.toString(),
      //     layout: 'gggggggggg',
      //   });
      // }
      this.processSeatChart(this.seatConfig);
    }
  
    public processSeatChart ( map_data : any[] )
    {
      
        if( map_data.length > 0 )
        {
          var seatNoCounter = 1;
          for (let __counter = 0; __counter < map_data.length; __counter++) {
            var row_label = "";
            var item_map = map_data[__counter].seat_map;
  
            //Get the label name and price
            row_label = "Row "+item_map[0].seat_label + " - ";
            if( item_map[ item_map.length - 1].seat_label != " " )
            {
              row_label += item_map[ item_map.length - 1].seat_label;
            }
            else
            {
              row_label += item_map[ item_map.length - 2].seat_label;
            }
            row_label += " : Rs. " + map_data[__counter].seat_price;
            
            item_map.forEach((map_element: { seat_label: string; layout: string; }) => {
              var mapObj:any = {
                "seatRowLabel" : map_element.seat_label,
                "seats" : [],
                "seatPricingInformation" : row_label
              };
              row_label = "";
              var seatValArr = map_element.layout.split('');
              if( this.seatChartConfig.newSeatNoForRow )
              {
                seatNoCounter = 1; //Reset the seat label counter for new row
              }
              var totalItemCounter = 1;
              seatValArr.forEach(item => {
                var seatObj:any = {
                  "key" : map_element.seat_label+"_"+totalItemCounter,
                  "price" : map_data[__counter]["seat_price"],
                  "status" : "available"
                };
                 
                if( item != '_')
                {
                  seatObj["seatLabel"] = map_element.seat_label+" "+seatNoCounter;
                  if(seatNoCounter < 10)
                  { seatObj["seatNo"] = "0"+seatNoCounter; }
                  else { seatObj["seatNo"] = ""+seatNoCounter; }
                  
                  seatNoCounter++;
                }
                else
                {
                  seatObj["seatLabel"] = "";
                }
                totalItemCounter++;
                mapObj["seats"].push(seatObj);
              });
              console.log(" \n\n\n Seat Objects " , mapObj);
              this.seatmap.push( mapObj );
  
            });
          }
  
          
          // for (let __counter = 0; __counter < map_data.length; __counter++) {
          //   var row_label = "";
          //   var rowLblArr = map_data[__counter]["seat_labels"];
          //   var seatMapArr = map_data[__counter]["seat_map"];
          //   for (let rowIndex = 0; rowIndex < rowLblArr.length; rowIndex++) {
          //     var rowItem = rowLblArr[rowIndex];
          //     var mapObj = {
          //       "seatRowLabel" : rowItem,
          //       "seats" : []
          //     };
          //     var seatValArr = seatMapArr[rowIndex].split('');
          //     var seatNoCounter = 1;
          //     var totalItemCounter = 1;
          //     seatValArr.forEach(item => {
          //       var seatObj = {
          //         "key" : rowItem+"_"+totalItemCounter,
          //         "price" : map_data[__counter]["seat_price"],
          //         "status" : "available"
          //       };
                 
          //       if( item != '_')
          //       {
          //         seatObj["seatLabel"] = rowItem+" "+seatNoCounter;
          //         if(seatNoCounter < 10)
          //         { seatObj["seatNo"] = "0"+seatNoCounter; }
          //         else { seatObj["seatNo"] = ""+seatNoCounter; }
                  
          //         seatNoCounter++;
          //       }
          //       else
          //       {
          //         seatObj["seatLabel"] = "";
          //       }
          //       totalItemCounter++;
          //       mapObj["seats"].push(seatObj);
          //     });
          //     console.log(" \n\n\n Seat Objects " , mapObj);
          //     this.seatmap.push( mapObj );
          //     console.log(" \n\n\n Seat Map " , this.seatmap);
              
          //   }
                     
          // }
        }
    }
  
    public selectSeat( seatObject : any )
    {
      console.log( "Seat to block: " , seatObject );
      if(seatObject.status == "available")
      {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
      }
      else if( seatObject.status = "booked" )
      {
        seatObject.status = "available";
        var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
        if( seatIndex > -1)
        {
          this.cart.selectedSeats.splice(seatIndex , 1);
          this.cart.seatstoStore.splice(seatIndex , 1);
          this.cart.totalamount -= seatObject.price;
        }
        
      }
    }
  
    public blockSeats(seatsToBlock : string)
    {
      if(seatsToBlock != "")
      {
        var seatsToBlockArr = seatsToBlock.split(',');
        for (let index = 0; index < seatsToBlockArr.length; index++) {
          var seat =  seatsToBlockArr[index]+"";
          var seatSplitArr = seat.split("_");
          console.log("Split seat: " , seatSplitArr);
          for (let index2 = 0; index2 < this.seatmap.length; index2++) {
            const element = this.seatmap[index2];
            if(element.seatRowLabel == seatSplitArr[0])
            {
              var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
              if(seatObj)
              {
                console.log("\n\n\nFount Seat to block: " , seatObj);
                seatObj["status"] = "unavailable";
                this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
                console.log("\n\n\nSeat Obj" , seatObj);
                console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
                break;
              }
               
            }
          }
         
        }
      }
      
    }
  
  }
