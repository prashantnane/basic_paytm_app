import { Link } from "react-router-dom";

export function BottomWarning(props) {
    return (
        <div className="flex text-sm justify-center py-2">
            <div>
                {props.label}
            </div>
            <Link className="pointer cursor-pointer underline pl-1" to={props.to}>{props.buttonText}</Link>
        </div>
    );
}