import { TextAtom } from "@shared/src/components/atoms/Text/TextAtom";
import { GradientTemplate } from "@shared/src/components/templates/GradientTemplate";
import { NavType } from "@src/navigation/types";
import React from "react";

interface ViewPdfProps extends NavType<'ViewPdf'>{}
export const ViewPdf:React.FunctionComponent<ViewPdfProps>= () =>{
    return(
        <GradientTemplate>
          <TextAtom text="" />
        </GradientTemplate>
    )
}