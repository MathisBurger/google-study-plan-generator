import React from "react";
import {useRouter} from "next/router";

/**
 * Component that displays the info text on the homepage.
 *
 * @constructor
 */
const InfoText: React.FC = () => {

    const router = useRouter();

    return (
        <div className="col">
            <div className="row-md-12">
                <h1>Getting Started</h1>
            </div>
            <div className="row-md-12">
                <p>
                    Welcome to the study plan generator.
                </p>
            </div>
            <div className="row-md-12">
                <button className="btn btn-lg btn-primary" onClick={() => router.push("/generator")}>
                    Generator
                </button>
            </div>
        </div>
    )
}

export default InfoText;
