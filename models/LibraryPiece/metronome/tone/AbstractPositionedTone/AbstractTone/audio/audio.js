Audio = {
    initializeSound_onFinishedLoading: function(finishedLoadingFunction) {
        Audio.finishedLoadingFunction = finishedLoadingFunction;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.context = new AudioContext();
        }
        catch (e) {
            alert('Web Audio API is not supported in Audio browser');
        };
        var bufferLoader = new BufferLoader(context, Audio.toneSounds, Audio.finishedLoading);
        bufferLoader.load();
    },
    get toneSounds() {
        return [
            '/sounds/tone_700hz.mp3',
            '/sounds/tone_800hz.mp3',
            '/sounds/tone_850hz.mp3',
            '/sounds/tone_900hz.mp3',
            '/sounds/tone_950hz.mp3',
            '/sounds/tone_1000hz.mp3',
            '/sounds/tone_1050hz.mp3',
            '/sounds/tone_1100hz.mp3',
            '/sounds/tone_1150hz.mp3',
            '/sounds/tone_1200hz.mp3',
            '/sounds/tone_1250hz.mp3',
            '/sounds/tone_1300hz.mp3',
            '/sounds/tone_1350hz.mp3',
            '/sounds/tone_1400hz.mp3',
            '/sounds/tone_1450hz.mp3',
            '/sounds/tone_1500hz.mp3',
            '/sounds/tone_2000hz.mp3',
            '/sounds/tone_2500hz.mp3',
            '/sounds/tone_3000hz.mp3',
            '/sounds/tone_3500hz.mp3',
            '/sounds/tone_4000hz.mp3',
            '/sounds/tone_Silence_1ms.wav'];
    },
    finishedLoading: function(buffers) {
        Audio.assignTones(buffers);
        if (Audio.finishedLoadingFunction) {Audio.finishedLoadingFunction.apply()};
    },
    assignTones: function(buffers) {
        Audio.tone_700hz = buffers[0];
        Audio.tone_800hz = buffers[1];
        Audio.tone_850hz = buffers[2];
        Audio.tone_900hz = buffers[3];
        Audio.tone_950hz = buffers[4];
        Audio.tone_1000hz = buffers[5];
        Audio.tone_1050hz = buffers[6];
        Audio.tone_1100hz = buffers[7];
        Audio.tone_1150hz = buffers[8];
        Audio.tone_1200hz = buffers[9];
        Audio.tone_1250hz = buffers[10];
        Audio.tone_1300hz = buffers[11];
        Audio.tone_1350hz = buffers[12];
        Audio.tone_1400hz = buffers[13];
        Audio.tone_1450hz = buffers[14];
        Audio.tone_1500hz = buffers[15];
        Audio.tone_2000hz = buffers[16];
        Audio.tone_2500hz = buffers[17];
        Audio.tone_3000hz = buffers[18];
        Audio.tone_3500hz = buffers[19];
        Audio.tone_4000hz = buffers[20];
        Audio.tone_Silent_1ms = buffers[21];
    },
    startBufferAtTimeAtPosition: function(buffer, time, vector) {
        var source = context.createBufferSource();
        var panner = context.createPanner();
        source.buffer = buffer;
        panner.setPosition(vector[0], vector[1], vector[2]);
        panner.connect(context.destination);
        source.connect(panner);
        source.start(time);
        return source;
    },
    startBufferAtTime: function(buffer, time) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(time);
        return source;
    }
}
