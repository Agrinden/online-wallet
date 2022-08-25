import { Injectable } from '@angular/core';
import { Subject, Subscription, takeWhile, tap, timer } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    public timerSubject$ = new Subject<number>();

    public timerValue$ = this.timerSubject$.asObservable();

    private set timerValue(timerValue: number) {
        this.timerSubject$.next(timerValue);
    }

    timer(counter: number, interval: number, func: () => void): Subscription {
        let timeLast = counter;
        const obs = timer(counter, interval).pipe(
            takeWhile(() => timeLast > 0),
            tap(() => (timeLast -= 1))
        );

        return obs.subscribe(() => {
            if (timeLast === 0) func();
            return (this.timerValue = timeLast);
        });
    }
}
