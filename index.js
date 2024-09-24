const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function esDiagonal(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i !== j && matrix[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}

function calcularOperaciones(matrices) {
    let max = -Infinity;
    let min = Infinity;
    let suma = 0;
    let totalElementos = 0;

    matrices.forEach(matrix => {
        matrix.forEach(row => {
            row.forEach(value => {
                if (value > max) max = value;
                if (value < min) min = value;
                suma += value;
                totalElementos++;
            });
        });
    });

    let promedio = suma / totalElementos;
    return { max, min, promedio, suma };
}

app.post('/calcular', (req, res) => {
    const { Q, R } = req.body;

    if (!Q || !R) {
        return res.status(400).json({ error: "Debe proporcionar las matrices Q y R" });
    }

    const { max, min, promedio, suma } = calcularOperaciones([Q, R]);

    const esQDiagonal = esDiagonal(Q);
    const esRDiagonal = esDiagonal(R);

    res.json({
        max,
        min,
        promedio,
        suma,
        esQDiagonal,
        esRDiagonal
    });
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});