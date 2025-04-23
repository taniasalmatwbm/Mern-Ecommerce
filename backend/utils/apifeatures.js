class ApiFeature {
    //query keyword var h queryStry product name h 
    constructor(query,queryStr) {
     this.query= query;
     this.queryStr = queryStr;
    }
    
    // search method
    search(){
         //params mein keyword ko tick kr k search kare gy
        const keyword = this.queryStr.keyword ? {
            name:{
                //word ko indetail check kare ga 
                $regex: this.queryStr.keyword, 
                //casesensitive capitital word mein likh diya h to agr samll mein hua tu
                //us mein b dhonde ga
                $options: 'i'                   
            }
        }:{};
        //console.log(keyword);
        
        //keyword pr working kr k http req ko wapis de diya
         // constructor query mein yahi to aya h    
         this.query = this.query.find({...keyword});
        return this;
        }

   // filter method
   filter(){
     //params mein category ko tick kr k filter kare gy
    //this.queryStr serf lety to upr waly k ref mil jata or us k direct method mein changing hu jati
    //hamry us ki copy cheya ta k gr search kiya b hua h to filter k waqt remove hu jye
    const queryCopy = {...this.queryStr};
        //{ keyword: 'Cpu', category: 'laptop' } 
        //agr kesi filter pr click kiya h remove keywaor kiye bagir tu ye show hu ga
    //console.log(queryCopy)
    // Cpu remove krna h
   
    const removeFeilds =['keyword','page','limit'];
    removeFeilds.forEach((key)=>delete queryCopy[key]);
     //filter krne se pahle pahli keyword ko remove krna pary ga
    // es console mein serf filer word show hu ga jesy k laptop
    //{category: 'laptop' }  category a jaye gi {laptop, phone }
    //console.log(queryCopy) 

     //Filter for price and rating
      //params mein price ko tick kr k filter kare gy
     // mongodb mein direct  price query k liye $ k sath bhjna parta h http mein
     // ham direct 1200 wala product de do mongodb se nhi le sakte 
     // $lt $gt $lte $gte $ne $in $nin $all $mod
     
     //console.log(queryCopy)//range price in object mein a jaye gi
     //{ price: { gt: '4300', lt: '5000' } }
    let queryStr = JSON.stringify(queryCopy); 
    // console.log(queryStr) 
     //{"price":{"gt":"4300","lt":"5000"}}
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    //console.log(queryStr) 
    //{"price":{"$gt":"4300","$lt":"5000"}}
    this.query = this.query.find(JSON.parse(queryStr));
      
    //console.log(this.query) //mongodb k sara indetail data a jaye ga
    return this;
   }
  
  // pagination method
   pagination(resultPerPage){      //4
    //bydefault 1 agr pagination kare to wo de dein
   const currentPage = Number(this.queryStr.page) || 1;
   const skip = resultPerPage*(currentPage - 1);
   this.query =this.query.limit(resultPerPage).skip(skip)
   return this;
   }
    }

   

module.exports = ApiFeature