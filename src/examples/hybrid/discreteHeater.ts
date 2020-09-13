export default {
    name:"Heater with discrete time",
    model:
`//Heater with discrete time
const Tref = 25;
const THyst = 5;//hysteresis
const dt = 0.10;//switch every 0.1 seconds
const C = 5;

_state(t0) = 1;//on state
timer(t0) = 0;
T(t0) = 20;
c(t0) = 0;
timer' = 1;
_state' = 0;
c' = 0;
T' = c*T;
state switch{
    set _state = {_state>0?{T>Tref+THyst?-1:1}:{T<Tref-THyst?1:-1}};
    set c = {_state>0?{T>Tref+THyst?-C:C}:{T<Tref-THyst?C:-C}};
    set timer = 0;
} from initial,switch on(timer>dt);
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