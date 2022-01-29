import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import AppConfg from "../config.json";
import { useRouter } from "next/router";
import { useState } from "react";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${AppConfg.theme.colors.neutrals["000"]};
          font-size: 48px;
          font-weight: bold;
          font-family: monospace;
          padding-top: 24px;
        }
      `}</style>
    </>
  );
}

export default function PaginaIncial() {
  const [nome, setNome] = useState("Nosdezin");
  const Root = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AppConfg.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: AppConfg.theme.colors.neutrals[700],
          }}
        >
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              // window.location.href = "./chat";
              Root.push(`/chat?username=${nome}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title>Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: AppConfg.theme.colors.neutrals[300],
              }}
            >
              {AppConfg.name}
            </Text>
            <TextField
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              textFieldColors={{
                neutral: {
                  textColor: AppConfg.theme.colors.neutrals[200],
                  mainColor: AppConfg.theme.colors.neutrals[900],
                  mainColorHighlight: AppConfg.theme.colors.primary[500],
                  backgroundColor: AppConfg.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: AppConfg.theme.colors.neutrals["800"],
                mainColor: AppConfg.theme.colors.primary[500],
                mainColorLight: AppConfg.theme.colors.primary[400],
                mainColorStrong: AppConfg.theme.colors.primary[600],
              }}
            ></Button>
          </Box>

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: AppConfg.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: AppConfg.theme.colors.neutrals[999],
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{ borderRadius: "50%", marginBottom: "16px" }}
              src={`https://github.com/${nome}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: AppConfg.theme.colors.neutrals[200],
                backgroundColor: AppConfg.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {nome}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
