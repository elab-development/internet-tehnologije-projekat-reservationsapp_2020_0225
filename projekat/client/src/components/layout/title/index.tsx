import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import { logo, reservations_app } from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Reservations_App" width="50px" />
        ) : (
          <div>
            <img
              src={reservations_app}
              alt="Reservations_App"
              width="195px"
            />
          </div>
        )}
      </Link>
    </Button>
  );
};


