app.post('/calculate', async (req, res) => {
    try {
        const { area, floors, foundationType, wallMaterial, roofType, additionalOptions, email } = req.body;

        if (!area || !floors || !foundationType || !wallMaterial || !roofType || !email) {
            return res.status(400).json({ error: 'Все поля обязательны' });
        }

        const totalCost = calculateCost({ area, floors, foundationType, wallMaterial, roofType, additionalOptions });

        const calculation = new Calculation({
            area,
            floors,
            foundationType,
            wallMaterial,
            roofType,
            additionalOptions,
            totalCost,
            email,
        });

        await calculation.save();

        // Отправка email с результатом
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Используйте нужный сервис
            auth: {
                user: 'your_email@gmail.com', // Укажите ваш email
                pass: 'your_password', // Укажите пароль
            },
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Результат расчета стоимости строительства',
            text: `Ваш расчет: \n\nПлощадь: ${area} кв.м\nЭтажей: ${floors}\nТип фундамента: ${foundationType}\nМатериал стен: ${wallMaterial}\nТип крыши: ${roofType}\nДополнительные опции: ${additionalOptions.join(', ')}\n\nИтоговая стоимость: ${totalCost} руб.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Не удалось отправить email' });
            }
            res.json({ message: 'Расчет выполнен и отправлен на email', totalCost });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


