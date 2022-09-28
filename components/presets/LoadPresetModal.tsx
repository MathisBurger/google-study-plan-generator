import {LessonTimes, Preset} from "../../typings/LessonTimes";
import React, {useMemo, useState} from "react";
import {defaultPreset} from "../../defaults";

interface LoadPresetModalProps {
    /**
     * Loads the preset into the view
     *
     * @param preset The preset that should be loaded
     */
    loadPreset: (preset: LessonTimes) => void;
    /**
     * Is executed to close the modal
     */
    onClose: () => void;
}

/**
 * A modal used to load lesson time presets.
 *
 * @constructor
 */
const LoadPresetModal: React.FC<LoadPresetModalProps> = ({loadPreset, onClose}) => {

    const [selectedPreset, setSelectedPreset] = useState<number>(0);

    const preloadedPresets = localStorage.getItem('presets');

    const presets = useMemo<Preset[]>(() => {
        const presets = localStorage.getItem('presets');
        if (presets === null) {
            return [defaultPreset];
        } else {
            return [defaultPreset, ...JSON.parse(presets)];
        }
    }, [preloadedPresets]);

    const onSave = () => {
        loadPreset(presets[selectedPreset].preset);
        onClose();
    }

    const getClassNameArray = (id: number) => {
        let item = 'list-group-item';
        if (id === selectedPreset) {
            item +=  ' active';
        }
        return item;
    }


    return (
        <div className="modal" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Presets</h5>
                        <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Select your preset here</p>
                        <ul className="list-group">
                            {presets.map((preset, index) => (
                                <li className={getClassNameArray(index)} onClick={() => setSelectedPreset(index)}>{preset.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onSave}>Load preset</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadPresetModal;
