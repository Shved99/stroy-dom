import React, { useState } from "react";
import "./Services.css";

const Services = ({ services }) => {


    return (
        <div className="services-page">
            <h1>Наши услуги</h1>

            {/* Фильтрация */}

            {/* Список услуг */}
            <div className="services-list">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <img src={service.image} alt={service.name} />
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <p className="price">Цена: {service.price} ₽</p>
                    </div>
                ))}
            </div>

            {/* Галерея */}
            <div className="gallery">
                <h2>Фотогалерея</h2>
                <div className="gallery-grid">
                    {services.map((service, index) => (
                        <div key={index} className="gallery-item">
                            <img src={service.image} alt={service.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
