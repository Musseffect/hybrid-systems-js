import { DaeSystemDefinition, HybridSystemDefinition } from "./astNode";





class EHybridCompiler{

    compile(hybridDef:HybridSystemDefinition):CustomEHybridSystem{

    }
}
class IHybridCompiler{
    compile(hybridDef:HybridSystemDefinition):CustomIHybridSystem{

    }
}
class EDAECompiler{
    compile(daeDef:DaeSystemDefinition):CustomEDAEHybridSystem{

    }

}
class IDAECompiler{
    compile(daeDef:DaeSystemDefinition):CustomIDAEHybridSystem{

    }

}