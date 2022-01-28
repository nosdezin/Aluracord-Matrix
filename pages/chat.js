import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import appConfig from "../config.json";

export default function ChatPage() {
  const [message, setMSG] = useState("");
  const [list, setList] = useState([]);

  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3Mjk4OSwiZXhwIjoxOTU4OTQ4OTg5fQ.79gVU51M9tEXVTUFB6ZgK_K--HnVCOkCI_cdkZjiVY4";
  const SUPABASE_URL = "https://loipszxyeojnjgonuxte.supabase.co";
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .then(({ data }) => setList(data));
  }, [list]);

  function handleNovaMSG(newMSG) {
    // setList([...list, newMSG]);
    const msgSchema = {
      autor: "Nosdezin",
      texto: newMSG, 
      // id: list.length,
    };

    supabaseClient
      .from("mensagens")
      .insert([msgSchema])
      .then(({ data }) => setList(data[0], ...list));

    // setList([msgSchema, ...list]);
    setMSG("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={list} />
          {/* {list.map((msgAtual) => {
            // console.log(msgAtual);
            return (
              <li key={msgAtual.id}>
                {msgAtual.autor}: {msgAtual.texto}
              </li>
            );
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={message}
              onChange={(e) => {
                setMSG(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMSG(e.target.value);
                }
              }}
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              variant="tertiary"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["800"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              label="Ok!"
              onClick={(e) => {
                e.preventDefault();
                handleNovaMSG(message);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((item) => {
        return (
          <Text
            key={item.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${item.autor}.png`}
              />
              {/* <Text tag="strong">Vanessa</Text> */}
              <Text tag="strong">{item.autor}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {/* {new Date().toLocaleDateString()} */}
                {item.created_at}
              </Text>
            </Box>
            {/* <Text>Mensagem</Text> */}
            {item.texto}
          </Text>
        );
      })}
    </Box>
  );
}
