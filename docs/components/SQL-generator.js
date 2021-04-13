import React from "react"

import "../css/components/topic-calculator.css"

class SQLApp extends React.Component {
    
    constructor() {
        super();
        this.state = {
            address_input: "0xc00e94cb662c3520282e6f5717214004a7f26888",
            error: false,
            error_message: "",
            text: "Copy to clipboard",
            chain_id: "chain_eth_mainnet"

        };
    }

    render() {

        var err = this.state.error ? this.state.error_message : null;

      return <div className="topics">
        <div>
    
        <p>Enter the contract address:</p>
        <input placeholder="Contract address"
          value={this.state.address_input}
          onChange={this._inputAddress}
        /> 

        <select onChange={this._inputChainId}>
         <option value = "chain_eth_mainnet">Ethereum Mainnet</option>
         <option value = "chain_matic_mainnet">Matic Mainnet</option>
         <option value = "chain_bsc">Binance Smart Chain</option>
         <option value = "chain_avalanche_mainnet">Avalanche C-Chain Mainnet</option>
       </select>

        <button onClick={this._clickNext} >Get event SQL!</button>
      </div>

      {err} 

      {this.state.error?" Try to enter it again. ":(this._renderEvents())}
      </div>

    }

   _sql = (s,e) => {
     let inputs = e.inputs;  
     const ifields = inputs.filter(input => input.indexed).map((inp,i)=>{
      switch (inp.type) {
          case "address":
              return "'0x' || encode(extract_address(e.topics[" + (i + 2) + "]), 'hex') AS logged_" + inp.name.toLowerCase();
          default:
              return "e.topics[" + (i + 2) + "] AS logged_" + inp.name.toLowerCase();
       }
     });

     const dfields = inputs.filter(input => !input.indexed).map((inp,i) => {
      switch (inp.type) {
         case "address":
              return "'0x' || encode(extract_address(abi_field(e.data, " + i + ")), 'hex') AS logged_" + inp.name.toLowerCase();
          default:
              return "cast(abi_field(e.data, " + i + ") as numeric) AS logged_" + inp.name.toLowerCase();
      }
     });


return <pre>
SELECT <br/>
{"    e.block_signed_at,"} <br />
{"    e.block_height,"} <br />
{"    '0x' || encode(e.tx_hash, 'hex') AS tx_hash,"} <br />
{"    " + ifields.join(", \n    ")}{dfields.length > 0 ? "," : ""}   <br/>
{"    " + dfields.join(", \n    ")} <br />
FROM {this.state.chain_id}.block_log_events e <br />
WHERE <br />
{"    "} e.sender = {"'\\x" + this.state.address_input.substr(2) + "'"} <br />
{"    "} AND e.topics[1] = {"'\\x" + s.substr(2) + "'"}
</pre>;


    }


    _renderEvents = () => {
        if (this.state.events !== undefined){
         let items = this.state.events.data.items[0].abi_items;
         let a = items.filter((item)=> {
           return item.signature !==null; 
         })
     
         return <div className="topics">
             <p>Found {a.length} Topics:</p>
             
               {a.map(item => {
                  const result = this._sql(item.topic_hash, item.abi);
                  return <div>
                  <ul style={{listStyleType: "none"}}>
                    {item.signature}
                    <div class="box">
                    <code>{item.topic_hash}</code>
                    {result}
                     <li><button id={item.topic_hash} className="buttonW" onClick={this._copyFunction.bind(this,result,item.topic_hash)}>{this.state.text}</button></li>         
                    </div>              
                    </ul>
                    </div>
               })}
           
     
           </div>;
     
        }
      
       }


    _clickNext = () => {
    
        if (this.state.address_input.length === "0xc00e94cb662c3520282e6f5717214004a7f26888".length) {
          fetch("https://api.covalenthq.com/v1/1/events/address/" +
            this.state.address_input + "/abi/?&key=ckey_4d5b231f1a584413ae6c3715bcf")
          .then(response => response.json())
          .then((data)=> {
    
            if(data.data.items.length === 0) {
              this.setState({
                error: true,
                error_message: "Invalid contract address!"
      
              });
            }
            else {
              this.setState({
                events: data, //data
                error: false
              });
    
            }     
    
          }).catch((err) => {
            console.log(err + " thrown out when fetching the API!");
           
          })
        } else {
          this.setState({
            error: true,
            error_message: "Contract address shorter than expected!"
          });
        }
      }

      _copyFunction = (a,b,c) => {
        // console.log(a); //a is result
        // console.log(b); //topic hash
       
        let textArray = a.props.children;
        let bigStr = "";
        for (let x of textArray){
          if (typeof x === 'string' || x instanceof String) {
            if (x.length !== 0) {
              bigStr += x;
            }
          }
          else {
            bigStr += "\n";
          }

        }    
      
        let aa = document.getElementsByClassName("buttonW");
        for (let item of aa){
          if (item.id === b){
            document.getElementById(b).innerText = "Copied!";
          }
          else{
            item.innerText = "Copy to clipboard";
          }
    
        }
        this.copyToClipboard(bigStr);
     
        
      }


      copyToClipboard = (contents) => {
        // tslint:disable-next-line:no-unused
        let selectedText = "";
    
        const fakeElement = document.createElement("textarea");
    
        fakeElement.style.fontSize = "12pt";
        fakeElement.style.border = "0";
        fakeElement.style.padding = "0";
        fakeElement.style.margin = "0";
        fakeElement.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px";
        fakeElement.style.position = "fixed";
        fakeElement.style[document.documentElement.getAttribute("dir") === "rtl" ? "right" : "left"] = "-9999px";
        fakeElement.setAttribute("readonly", "");
        
        fakeElement.value = contents;
        document.body.appendChild(fakeElement);
        fakeElement.focus();
        fakeElement.setSelectionRange(0, fakeElement.value.length);
    
        selectedText = fakeElement.value;
     
        document.execCommand("copy");
        (window.getSelection()).removeAllRanges();       
    
    };




    _inputAddress = (e) => {
        this.setState({
          //under setState, can just set one field 
          //e here is the value when calling this function
          //when setState is called, calling render function again
          address_input: e.target.value
        });
      }

      _inputChainId = (e) => {
        this.setState({
          chain_id: e.target.value
        })
      }
}




export default (props) => {
    return (
  
      <SQLApp />
  
    )
  }