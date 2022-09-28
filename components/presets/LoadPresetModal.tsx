import {LessonTimes} from "../../typings/LessonTimes";
import React, {useCallback, useMemo, useState} from "react";

interface LoadPresetModalProps {
    loadPreset: (preset: LessonTimes) => void;
    onClose: () => void;
}

interface Preset {
    name: string;
    preset: LessonTimes;
}

const LoadPresetModal: React.FC<LoadPresetModalProps> = ({loadPreset, onClose}) => {

    const [selectedPreset, setSelectedPreset] = useState<number>(0);

    const presets = useMemo<Preset[]>(() => {
        const presets = localStorage.getItem('presets');
        if (presets === null) {
            return [];
        } else {
            return JSON.parse(presets);
        }
    }, [localStorage.getItem('presets')]);

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
                        <button type="button" className="btn btn-primary" onClick={onSave}>Save as preset</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadPresetModal;