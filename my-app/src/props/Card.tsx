import type { ReactNode } from "react";

interface CardProps {
    title: string;
    children: ReactNode;
}

const Card = ({title, children}: CardProps) => {
    return(
        <div className="card">
            <h3>{title}</h3>
            <div className="card-body">{children}</div>
        </div>
    )
}
export default Card