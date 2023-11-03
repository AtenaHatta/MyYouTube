import { useState } from "react";

function useUnsubscribe() {
  const [data, setData] = useState(null);
  
  const unsubscribeChannel = async (channelID) => {
    console.log('Unsubscribing from channel ID:', channelID);
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_HOST;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ channelID }),
    };

    try {
      const response = await fetch(`${url}/user/subscribelist`, options);
      const responseText = await response.text();
      console.log('Response:', responseText);
      
      if (response.ok) {
        setData((prevData) =>
          prevData.filter((channel) => channel.id !== channelID)
        );
      } else {
        console.error("Error unsubscribing from channel:", responseText);
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
    }
  };

  return {
    data,
    setData,
    unsubscribeChannel
  };
}

export default useUnsubscribe;
