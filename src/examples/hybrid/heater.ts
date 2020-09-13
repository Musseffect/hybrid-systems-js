export default {
    name:"Heater",
    model:
`//Heater
const Tref = 25;
const dT = 10;
const C = 5;
T(t0) = 20;
c = -C;
T' = c*T;
state switchOff{
c = -C;
} from initial,switchOn on(T>Tref+dT);
state switchOn{
c = C;
}from initial,switchOff on(T<Tref-dT);
`,
    parameters:{
        "t0":0,
        "time":40,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":250,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};