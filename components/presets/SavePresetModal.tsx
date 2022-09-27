import {LessonTimes} from "../../typings/LessonTimes";
import React, {useState} from "react";

interface SavePresetModalProps {
    preset: LessonTimes;
    onClose: () => void;
}

const SavePresetModal: React.FC<SavePresetModalProps> = ({preset, onClose}) => {

    const [presetName, setPresetName] = useState<string>('');

    const onSave = () => {
        let presets = localStorage.getItem('presets');
        let parsedPresets = [];
        if (presets === null) {
            parsedPresets.push({name: presetName, preset: preset});
        } else {
            parsedPresets = JSON.parse(presets);
            parsedPresets.push({name: presetName, preset: preset});
        }
        localStorage.setItem('presets', JSON.stringify(parsedPresets));
        onClose();
    }

    return (
        <div className="modal" style={{display: 'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Save preset</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Insert your preset name here</p>
                        <input type="text" className="form-control" value={presetName} onChange={(e) => setPresetName(e.target.value)} />
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

export default SavePresetModal;
