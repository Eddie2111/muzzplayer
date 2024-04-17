
import { ReactLenis } from '@studio-freight/react-lenis'
import { TypographyHeading } from "../components/typographies/Typography";
import Footer from "../components/ui/Footer";
export default function Home(){
    return(
        <ReactLenis root>
            <div>
                <TypographyHeading>MUZZPLAYER</TypographyHeading>
            </div>
            <Footer/>
        </ReactLenis>
    )
}

