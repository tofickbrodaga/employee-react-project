import React, { useEffect, useState } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Grid } from "@consta/uikit/Grid";
import { Loader } from "@consta/uikit/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../store/store";

const MainPage = () => {
  const dispatch = useDispatch();
  const mainNews = useSelector((state) => state.mainNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://673423afa042ab85d1190055.mockapi.io/api/v1/main"
        );
        const data = await response.json();
        dispatch(setNews(data));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [dispatch]);

  if (loading) {
    return <Loader size="m" style={{ marginTop: "2rem", textAlign: "center" }} />;
  }

  if (!mainNews || mainNews.length === 0) {
    return (
      <Text
        size="l"
        weight="bold"
        view="secondary"
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        Нет новостей для отображения
      </Text>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Text
        size="3xl"
        weight="bold"
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        Последние новости
      </Text>
      <Grid
        cols="1"
        gap="xl"
        breakpoints={{ m: { cols: 2 }, l: { cols: 3 } }}
        style={{ gap: "2rem" }}
      >
        {mainNews.map((publication) => (
          <Card
            key={publication.id}
            verticalSpace="l"
            horizontalSpace="l"
            shadow
            style={{
              paddingBottom: "1rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #eee",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            {/* Заголовок новости */}
            <Text
              weight="bold"
              size="2xl"
              style={{
                marginBottom: "0.75rem",
                color: "#222",
                lineHeight: "1.5",
              }}
            >
              {publication.name}
            </Text>

            {/* Описание новости */}
            <Text
              size="m"
              style={{
                marginBottom: "1rem",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              {publication.description}
            </Text>

            {/* Дата создания новости */}
            <Text
              size="s"
              view="secondary"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "#999",
              }}
            >
              {new Date(publication.createdAt).toLocaleDateString()}
            </Text>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default MainPage;
