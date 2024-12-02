import React, { useEffect, useState } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Link, useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Loader } from "@consta/uikit/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../store/store";
import { getToken } from "../services/token";

const ServicePage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://673423afa042ab85d1190055.mockapi.io/api/v1/services"
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке услуг");
        }
        const data = await response.json();
        dispatch(setServices(data));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [dispatch, navigate]);

  if (loading) {
    return <Loader size="m" style={{ marginTop: "2rem", textAlign: "center" }} />;
  }

  // Если услуг нет
  if (!services || services.length === 0) {
    return (
      <Text
        size="l"
        weight="bold"
        view="secondary"
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        Нет доступных услуг
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
        Доступные услуги
      </Text>
      <Grid
        cols={1}
        gap="xl"
        breakpoints={{ m: { cols: 2 }, l: { cols: 3 } }}
        style={{ gap: "2rem" }}
      >
        {services.map((service) => (
          <GridItem key={service.id}>
            <Card
              verticalSpace="xs"
              horizontalSpace="xs"
              shadow
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Картинка услуги */}
              <img
                src={`https://picsum.photos/200?random=${service.id}`}
                width="200px"
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
                alt={service.name}
              />

              {/* Контент услуги */}
              <div style={{ flex: 1 }}>
                <Text
                  weight="bold"
                  size="l"
                  style={{
                    marginBottom: "0.5rem",
                    color: "white",
                    lineHeight: "1.4",
                  }}
                >
                  {service.name}
                </Text>
                <Text
                  size="m"
                  style={{
                    marginBottom: "1rem",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.6",
                    color: "white",
                  }}
                >
                  {service.description}
                </Text>
                <Link to={`/service/${service.id}`}>
                  <Text as="span" view="link">
                    Подробнее
                  </Text>
                </Link>
              </div>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ServicePage;
