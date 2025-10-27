import Card from "../../components/Card";
import Navigation from "../../components/Navigation";
import Tabs from "../../components/Tabs";
import React, { useState } from "react";
import Creation from './Creation'
import AdvancedBtns from './AdvanceBtns'
import SelfFunctions from './SelfFunctions'


export default function Home() {
    const [hide, setHide] = useState(false)
    const handleChange = (isHide: boolean) => {
        setHide(isHide)
    }
    return (
        <div className="bg-sky-100">
            <Navigation hide={hide} />
            <div className="mx-auto max-w-5xl flex my-2 px-2">
                <Card className="w-2/3">
                    <Tabs onChange={handleChange}></Tabs>
                </Card>
                <div className="w-1/3">
                    <Card className="w-full">
                        <Creation />
                    </Card>
                    <Card className="w-full">
                        <AdvancedBtns />
                    </Card>
                    <Card className="w-full">
                        <SelfFunctions />
                    </Card>
                </div>
            </div>
        </div>
    )
}