import React from "react";

import { CirclePicker } from "react-color";
import Typography from "@material-ui/core/Typography";

const ColorPicker = (props) => {
  const handleChange = (color) => {
    props.colorPickerHandler(color);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Typography variant="overline">Choose a color category</Typography>

      <CirclePicker
        id="color-picker"
        colors={[
          "#e3092d", //Red
          "#e91e63", //Pink
          "#fcba03", //Yellow
          "#673ab7", //Purple
          "#08c741", //Green
          "#0f7ed4", //Blue
        ]}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorPicker;
