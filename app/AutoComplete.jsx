import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import busstops from './busstops.js';

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(params) {
    const { suggestion, index, itemProps, theme, highlightedIndex, selectedItem } = params;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem === suggestion.label;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestions(inputValue) {
    let count = 0;

    return busstops.stops.filter(suggestion => {
        const keep =
        (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) 
        && count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

const styles = {
    container: {
        flexGrow: 1,
        height: 200,
    },
    textField: {
        width: '100%',
    },
};

function IntegrationAutosuggest(props) {
    const { history, classes, theme } = props;
    const handleSelect = (item) => {
        const stop = busstops.stops.filter((b) => b.label === item).pop().stop;
        history.push("/" + stop);
    };

    return (
        <Downshift
            onSelect={(item) => handleSelect(item)}
            render={({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
            }) => (
                <div className={classes.container}>
                    {renderInput(
                        getInputProps({
                            classes,
                            placeholder: 'Suche nach 1 Bushaltestelle',
                            id: 'integration-downshift',
                        }),
                    )}
                    {isOpen
                        ? renderSuggestionsContainer({
                            children: getSuggestions(inputValue).map((suggestion, index) =>
                                renderSuggestion({
                                    suggestion,
                                    index,
                                    theme,
                                    itemProps: getItemProps({ item: suggestion.label }),
                                    highlightedIndex,
                                    selectedItem,
                                }),
                            ),
                        })
                    : null}
                </div>
            )}
        />
    );
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const AutoComplete = withRouter(IntegrationAutosuggest);

export default withStyles(styles, { withTheme: true })(AutoComplete);

