//responsible for managing Light Colors
import DarkColors from "./DarkColors";

//responsible for managing Dark Colors
import LightColors from "./LightColors";


class Colors {

    //all Light Color Access
    static getLightColor(nameOfColor) {
        return LightColors[nameOfColor]
     }

     //All Dark Colors Access
     static getDarkColor(nameOfColor) {
        return DarkColors[nameOfColor]
     }


}

export default Colors;