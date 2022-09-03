import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

function App() {
  // let myRef = React.useRef();
  const [body, setBody] = useState("");
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState("");

  // let click = () => {
  //   setBody(myRef.current.innerHTML);
  // };

  // console.log("this is body==>",body)
  const [items, setnewItems] = useState([
    {
      image: "https://osta.ng/wp-content/uploads/2021/03/1-791.jpg",
      phone: "Samsung Galaxy s8",
      price: 300.89,
      quantity: 1,
      id: 1,
    },

    {
      image:
        "https://www.gizmochina.com/wp-content/uploads/2019/05/Google-Pixel-3a-XL-300x300.jpg",
      phone: "Google Pixel",
      price: 386.99,
      quantity: 1,
      id: 2,
    },

    {
      image:
        "https://m-cdn.phonearena.com/images/phones/57958-350/Xiaomi-Redmi-Note-2.jpg",
      phone: "Xioami Redmi Note 2",
      price: 296.85,
      quantity: 1,
      id: 3,
    },

    {
      image:
        "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/40/106189/1.jpg?8869",
      phone: "Samsung Galaxy s7",
      price: 195.45,
      quantity: 1,
      id: 4,
    },
  ]);

  useEffect(() => {
    let sums = 0;

    items.map((item) => (sums += item.price * item.quantity));

    setSum(sums);
  }, [items]);

  const handleRemove = (id) => {
    setnewItems(items.filter((item) => id !== item.id));
  };
  const handleReset = () => {
    setnewItems([]);
  };

  const handleIncrease = (id) => {
    {
      let cartItems = items;
      let cart = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setnewItems(cart);
    }
  };

  const handleDecrease = (id,index) => {
    {
      if (items[index].quantity <= 1) {
        setnewItems(items.filter((item) => id !== item.id));
        return false;
      }

      let cartItems = items;
      let cart = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setnewItems(cart);
    }
    // count.map(counts=>setCount(counts=counts+1))
  };

  return (
    <div className="App">
      <h1>YOUR BAG</h1>
      <div className="container">
        {items.map((item, index) => {
          return (
            <div className="cover" key={item.id}>
              <div className="sub-cover">
                <img src={item.image} alt="" />
                <h2>{item.phone}</h2>
                <h3>${(item.price * item.quantity).toFixed(2)}</h3>
                <button
                  className="remove"
                  key={item.id}
                  onClick={() => {
                    handleRemove(item.id);
                  }}
                >
                  remove
                </button>
              </div>
              <div className="arrow-div">
                <FontAwesomeIcon
                  className="up"
                  icon={faAngleUp}
                  onClick={() => {
                    handleIncrease(item.id);
                  }}
                />
                <span className="counts">{item.quantity}</span>
                <FontAwesomeIcon
                  disabled={item.quantity < 1}
                  onClick={() => {
                    handleDecrease(item.id, index);
                  }}
                  icon={faAngleDown}
                />
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <hr className="line" />
      <h4>
        <span>Total: </span> <span id="total">${sum.toFixed(2)}</span>
      </h4>
      <button id="reset" onClick={handleReset}>
        CLEAR CART
      </button>
    </div>
  );
}

export default App;
